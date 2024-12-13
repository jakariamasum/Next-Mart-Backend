import { Router } from "express";
import { UserControllers } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/", UserControllers.getAllUsers);
router.get("/me", authMiddleware, UserControllers.getSingleUser);
router.put("/:id", UserControllers.updateUser);
router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;
