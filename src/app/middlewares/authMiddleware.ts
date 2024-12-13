import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import sendResponse from "../utils/sendResponse";
import AppError from "../errors/AppError";
import config from "../../config";

interface DecodedToken {
  id: string;
  role: "USER" | "ADMIN" | "VENDOR";
  email: string;
}

declare module "express-serve-static-core" {
  interface Request {
    id?: string;
    role?: "USER" | "ADMIN" | "VENDOR";
    email?: string;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("Missing token");
    throw new AppError(404, "Token missing");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      config.jwt_secret as string
    ) as DecodedToken;
    req.id = decodedToken.id;
    req.role = decodedToken.role;
    req.email = decodedToken.email;
    next();
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
      data: error,
    });
  }
};

// Middleware to check if user is admin
const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "ADMIN") {
    return sendResponse(res, {
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
      data: "",
    });
  }
  next();
};
// Middleware to check if user is admin
const isUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "USER") {
    return sendResponse(res, {
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
      data: "",
    });
  }
  next();
};
// Middleware to check if user is vendor
const isVendorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== "VENDOR") {
    return sendResponse(res, {
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
      data: "",
    });
  }
  next();
};

export {
  authMiddleware,
  isAdminMiddleware,
  isUserMiddleware,
  isVendorMiddleware,
};
