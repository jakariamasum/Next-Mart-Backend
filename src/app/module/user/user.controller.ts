import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  if (!result) {
    throw new AppError(404, "Users not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrived successfully!",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const email = req.email;
  console.log("hit here: ", email);
  const result = await UserServices.getSingleUsersFromDB(email!);
  if (!result) {
    throw new AppError(404, "User not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrived successfully!",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.body);
  if (!result) {
    throw new AppError(404, "Users not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserIntoDB(id);
  if (!result) {
    throw new AppError(404, "Users not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully!",
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
