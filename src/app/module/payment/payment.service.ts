import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const savePaymentDataToDB = async (session: any) => {
  try {
    const paymentData = {
      paymentId: session.id,
      amount: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details.email,
      status: session.payment_status,
      subscriptionId: session.subscription,
      productId: session.client_reference_id,
    };

    await prisma.payment.create({
      data: paymentData,
    });
    console.log("Payment data saved successfully:", paymentData);
    return true;
  } catch (error) {
    console.error("Error saving payment data to the database:", error);
  }
};

const getAllPaymentsFromDB = async () => {
  const result = await prisma.payment.findMany();
  return result;
};
const getUserPaymentsFromDB = async (email: string) => {
  console.log(email);
  const result = await prisma.payment.findMany({
    where: {
      customerEmail: email,
    },
  });
  return result;
};

export const PaymentServices = {
  savePaymentDataToDB,
  getAllPaymentsFromDB,
  getUserPaymentsFromDB,
};
