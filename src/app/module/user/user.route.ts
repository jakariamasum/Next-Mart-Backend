import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.get("/", UserControllers.getAllUsers);
router.get("/:id", UserControllers.getSingleUser);
router.put("/:id", UserControllers.updateUser);
router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;
