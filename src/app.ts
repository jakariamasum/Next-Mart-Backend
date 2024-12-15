/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import { PaymentControllers } from "./app/module/payment/payment.controller";

const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  PaymentControllers.savePaymentData
);
//parsers
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from boiler plate code");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
