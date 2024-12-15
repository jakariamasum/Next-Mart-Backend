import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServices } from "./product.service";

const createproduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body);
  if (!result) {
    throw new AppError(404, "Something went wrong.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product create successfully!",
    data: result,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductsFromDB();
  if (!result) {
    throw new AppError(404, "Products not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrived successfully!",
    data: result,
  });
});
const getSingleproduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getSingProductFromDB(id);
  if (!result) {
    throw new AppError(404, "Product not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrived successfully!",
    data: result,
  });
});
const updateproduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.updateProductIntoDB(id, req.body);
  if (!result) {
    throw new AppError(404, "Product not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deleteProductFromDB(id);
  if (!result) {
    throw new AppError(404, "Product not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully!",
    data: result,
  });
});

export const ProductControllers = {
  createproduct,
  getAllProducts,
  getSingleproduct,
  updateproduct,
  deleteProduct,
};
