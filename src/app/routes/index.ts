import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auh",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
