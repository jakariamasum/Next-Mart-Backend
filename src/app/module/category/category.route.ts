import { Router } from "express";
import { CategoryControllers } from "./caegory.controller";

const router = Router();

router.post("/", CategoryControllers.createCategory);
router.get("/", CategoryControllers.getAllCategories);
router.get("/:id", CategoryControllers.getSinglecategory);
router.put("/:id", CategoryControllers.updateCategory);
router.delete("/:id", CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
