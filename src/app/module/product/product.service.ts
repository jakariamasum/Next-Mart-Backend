import { PrismaClient } from "@prisma/client";
import { IProduct } from "./product.interface";

const prisma = new PrismaClient();

const createProductIntoDB = async (payload: IProduct) => {
  console.log("product: ", payload);
  const result = await prisma.product.create({
    data: {
      name: payload.name,
      price: Number(payload.price),
      category_id: payload.category_id,
      inventory: Number(payload.inventory),
      discount: Number(payload.discount),
      images: payload.images,
      rating: payload.rating,
      vendor_id: payload.vendor_id,
    },
  });
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await prisma.product.findMany({
    include: {
      category: true,
      vendor: true,
    },
  });
  return result;
};

const getSingProductFromDB = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      vendor: true,
    },
  });
  return result;
};
const getVendorProductFromDB = async (id: string) => {
  console.log("vendorId: ", id);
  const result = await prisma.product.findMany({
    where: { vendor_id: id },
    include: {
      category: true,
      vendor: true,
    },
  });
  return result;
};

const updateProductIntoDB = async (id: string, payload: IProduct) => {
  await prisma.product.findFirstOrThrow({
    where: { id },
  });
  const result = await prisma.product.update({
    where: { id },
    data: { ...payload },
  });
  return result;
};
const deleteProductFromDB = async (id: string) => {
  await prisma.product.findFirstOrThrow({
    where: { id },
  });
  const result = await prisma.product.delete({
    where: { id },
  });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingProductFromDB,
  getVendorProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
