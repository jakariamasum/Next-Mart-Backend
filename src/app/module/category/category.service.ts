import { PrismaClient } from "@prisma/client";
import { ICategory } from "./category.interface";

const prisma = new PrismaClient();

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getSingCategoryFromDB = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: { id },
  });
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>
) => {
  await prisma.category.findFirstOrThrow({
    where: { id },
  });
  const result = await prisma.category.update({
    where: { id },
    data: { ...payload },
  });
  return result;
};
const deleteCategoryFromDB = async (id: string) => {
  await prisma.category.findFirstOrThrow({
    where: { id },
  });
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
