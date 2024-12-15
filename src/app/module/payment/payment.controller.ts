import Stripe from "stripe";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";
import AppError from "../../errors/AppError";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

const stripe = new Stripe(config.stripe_secret!);
const checkout = catchAsync(async (req, res) => {
  console.log("hit payment", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: req.body.currency,
            product_data: {
              name: "Purchase",
            },
            unit_amount: req.body.amount * 100,
          },
          quantity: req.body.quantity,
        },
      ],
      mode: "payment",
      customer_email: req.body.customerEmail,
      client_reference_id: req.body.productId,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    console.log(session);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const savePaymentData = catchAsync(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment was successful:", session);

    // Save payment data to the database
    const isSaved = await PaymentServices.savePaymentDataToDB(session);
    if (isSaved) {
      console.log("Payment data saved successfully.", session);
    } else {
      console.error("Failed to save payment data.");
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

const getAllPayments = catchAsync(async (req, res) => {
  const result = await PaymentServices.getAllPaymentsFromDB();
  if (!result) {
    throw new AppError(404, "No payments available!");
  }
  sendResponse(res, {
    success: true,
    message: "Payments retrived sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getUserPayments = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await PaymentServices.getUserPaymentsFromDB(id as string);
  if (!result) {
    throw new AppError(404, "No payments available!");
  }
  sendResponse(res, {
    success: true,
    message: "Payments retrived sucessfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const PaymentControllers = {
  checkout,
  savePaymentData,
  getAllPayments,
  getUserPayments,
};
