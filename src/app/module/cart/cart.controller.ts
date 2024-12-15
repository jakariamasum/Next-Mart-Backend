import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartServices } from "./cart.service";

const createCart = catchAsync(async (req, res) => {
  const result = await CartServices.createCartIntoDB(req.body);
  if (!result) {
    throw new AppError(404, "Something went wrong.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart create successfully!",
    data: result,
  });
});
const getAllCarts = catchAsync(async (req, res) => {
  const result = await CartServices.getAllCartsFromDB();
  if (!result) {
    throw new AppError(404, "Cates not found.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart retrived successfully!",
    data: result,
  });
});
const getUserCart = catchAsync(async (req, res) => {
  const id = req.id;
  const result = await CartServices.getUserCartsFromDB(id!);
  if (!result) {
    throw new AppError(404, "Cates not found.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart retrived successfully!",
    data: result,
  });
});
const deleteCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartServices.deleteCartFromDB(id);
  if (!result) {
    throw new AppError(404, "Cart not found.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart deleted successfully!",
    data: result,
  });
});

export const CartControllers = {
  createCart,
  getAllCarts,
  getUserCart,
  deleteCart,
};
