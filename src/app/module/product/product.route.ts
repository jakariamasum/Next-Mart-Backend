import { Router } from "express";
import { ProductControllers } from "./product.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/", ProductControllers.createproduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/vendors/product/:id", ProductControllers.getVendorProducts);
router.get("/:id", ProductControllers.getSingleproduct);
router.put("/:id", ProductControllers.updateproduct);
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
