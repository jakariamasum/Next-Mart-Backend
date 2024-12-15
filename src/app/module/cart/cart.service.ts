import { PrismaClient } from "@prisma/client";
import { ICart } from "./cart.interface";

const prisma = new PrismaClient();

const createCartIntoDB = async (payload: ICart) => {
  const existingCartItem = await prisma.cart.findFirst({
    where: { user_id: payload.user_id, product_id: payload.product_id },
  });

  if (existingCartItem) {
    const updatedItem = await prisma.cart.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + Number(payload.quantity) },
    });
    return updatedItem;
  }

  const newCartItem = await prisma.cart.create({
    data: payload,
  });
  return newCartItem;
};

const getAllCartsFromDB = async () => {
  const result = await prisma.cart.findMany({
    include: { product: { include: { vendor: true } } },
  });
  return result;
};

const getUserCartsFromDB = async (id: string) => {
  const result = await prisma.cart.findMany({
    where: { user_id: id },
    include: {
      product: {
        include: {
          vendor: true,
        },
      },
    },
  });
  return result;
};

const deleteCartFromDB = async (id: string) => {
  await prisma.cart.findFirstOrThrow({
    where: { id },
  });
  const result = await prisma.cart.delete({
    where: { id },
  });
  return result;
};

export const CartServices = {
  createCartIntoDB,
  getAllCartsFromDB,
  getUserCartsFromDB,
  deleteCartFromDB,
};
