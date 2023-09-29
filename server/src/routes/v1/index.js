import express from "express";

import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import carRoutes from "./car.route.js";
import resultRoutes from "./result.route.js";
import criterionRoutes from "./criterion.route.js";

import Utility from "../../utils/utils.js";

const router = express.Router();

const routes = [
  {
    path: "/auth",
    subRoutes: authRoutes,
  },
  {
    path: "/users",
    subRoutes: userRoutes,
  },
  {
    path: "/cars",
    subRoutes: carRoutes,
  },
  {
    path: "/inspection-result",
    subRoutes: resultRoutes,
  },
  {
    path: "/criteria",
    subRoutes: criterionRoutes,
  },
];

routes.forEach((route) => {
  const subRouter = express.Router();

  // prettier-ignore
  route.subRoutes.forEach((subRoute) => {
    subRouter.route(subRoute.path)[subRoute.method](...subRoute.middlewares, Utility.catchAsync(subRoute.handler));
  });

  router.use(route.path, subRouter);
});

export default router;
