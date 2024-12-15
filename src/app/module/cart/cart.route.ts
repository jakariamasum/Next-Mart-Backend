import { Router } from "express";
import { CartControllers } from "./cart.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/", CartControllers.createCart);
router.get("/", CartControllers.getAllCarts);
router.get("/user", authMiddleware, CartControllers.getUserCart);
router.delete("/:", CartControllers.deleteCart);

export const CartRoutes = router;
