import express from "express";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();
router.post("/checkout", PaymentControllers.checkout);
router.get("/", PaymentControllers.getAllPayments);
router.get("/:id", PaymentControllers.getUserPayments);

export const PaymentRoutes = router;
