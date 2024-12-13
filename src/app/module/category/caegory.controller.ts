import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);
  if (!result) {
    throw new AppError(404, "Something went wrong.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category create successfully!",
    data: result,
  });
});
const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB();
  if (!result) {
    throw new AppError(404, "Categories not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrived successfully!",
    data: result,
  });
});
const getSinglecategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.getSingCategoryFromDB(id);
  if (!result) {
    throw new AppError(404, "Category not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category retrived successfully!",
    data: result,
  });
});
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.updateCategoryIntoDB(id, req.body);
  if (!result) {
    throw new AppError(404, "Category not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully!",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(id);
  if (!result) {
    throw new AppError(404, "Categories not find.");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category deleted successfully!",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSinglecategory,
  updateCategory,
  deleteCategory,
};
