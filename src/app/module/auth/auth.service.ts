import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { PrismaClient } from "@prisma/client";
import config from "../../../config";
import { ILogin, IRegister } from "./auth.interface";
import { createToken } from "../../utils/tokenGenerateFunction";

const prisma = new PrismaClient();

const registerUser = async (payload: IRegister) => {
  // checking if the user is exist
  const user = await prisma.user.findFirst({
    where: {
      email: payload?.email,
    },
  });

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already exist!");
  }

  payload.role = payload.role;
  const { password } = payload;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string)
  );
  payload.password = hashedPassword;

  //create new user
  const newUser = await prisma.user.create({
    data: payload,
  });

  //create token and sent to the  client

  const jwtPayload = {
    id: newUser.id,
    name: newUser.name as string,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expires as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (payload: ILogin) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (!user.isActive) {
      throw new AppError(403, "This user is blocked");
    }

    if (payload.password) {
      // For email/password login
      const isPasswordValid = await bcrypt.compare(
        payload.password,
        user.password as string
      );
      if (!isPasswordValid) {
        throw new AppError(403, "Invalid credentials");
      }
    } else {
      throw new AppError(400, "Invalid login method");
    }

    const jwtPayload = {
      id: user.id,
      name: user.name as string,
      email: user.email,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_secret as string,
      config.jwt_access_expires as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires as string
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError(500, "An unexpected error occurred");
    }
  }
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await prisma.user.findFirst({
    where: {
      email: userData?.email,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // checking if the user is blocked

  const userStatus = user?.isActive;

  if (userStatus === false) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  //checking if the password is correct

  if (!(await bcrypt.compare(payload?.oldPassword, user?.password as string))) {
    console.log(
      await bcrypt.compare(payload?.oldPassword, user?.password as string)
    );
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await prisma.user.update({
    where: {
      email: user?.email,
    },
    data: {
      password: newHashedPassword,
    },
  });
  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // checking if the user is blocked
  const userStatus = user?.isActive;

  if (userStatus === false) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  if (user.passwordChangedAt) {
    const passwordChangedTime =
      new Date(user.passwordChangedAt).getTime() / 1000;

    if (passwordChangedTime > (iat as number)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
  }

  const jwtPayload = {
    id: user.id,
    name: user.name as string,
    email: user.email,
    contactNumber: user.contactNumber,
    role: user.role,
    status: user.isActive,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expires as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
};
