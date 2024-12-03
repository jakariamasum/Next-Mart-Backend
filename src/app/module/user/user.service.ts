import { PrismaClient } from "@prisma/client";
import { IUser } from "./user.interface";

const prisma = new PrismaClient();
const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    where: {
      isDeleted: false,
    },
  });
  return users;
};

const getSingleUsersFromDB = async (email: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: { ...payload },
  });
  return result;
};

const deleteUserIntoDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUsersFromDB,
  updateUserIntoDB,
  deleteUserIntoDB,
};
