import { Router } from "express";
import { ProductControllers } from "./product.controller";

const router = Router();

router.post("/", ProductControllers.createproduct);
router.get("/", ProductControllers.getAllProducts);
router.put("/:id", ProductControllers.updateproduct);
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
