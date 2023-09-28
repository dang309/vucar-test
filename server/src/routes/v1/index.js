import express from "express";

import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import modelRoutes from "./model.route.js";
import taskRoutes from "./task.route.js";
import personRoutes from "./person.route.js";
import settingRoutes from "./setting.route.js";
import sqlBackupRoutes from "./sql_backup.route.js";
import faceRoutes from "./face.route.js";
import systemRoutes from "./system.route.js";
import serverRoutes from "./server.route.js";
import assetRoutes from "./asset.route.js";
import externalRoutes from "./external.route.js";

import Utility from "../../utils/utils.js";

const router = express.Router();

const routes = [
  {
    path: "/auth",
    subRoutes: authRoutes,
  },
  {
    path: "/assets",
    subRoutes: assetRoutes,
  },
  {
    path: "/users",
    subRoutes: userRoutes,
  },
  {
    path: "/models",
    subRoutes: modelRoutes,
  },
  {
    path: "/tasks",
    subRoutes: taskRoutes,
  },
  {
    path: "/people",
    subRoutes: personRoutes,
  },
  {
    path: "/settings",
    subRoutes: settingRoutes,
  },
  {
    path: "/faces",
    subRoutes: faceRoutes,
  },
  {
    path: "/system",
    subRoutes: systemRoutes,
  },
  {
    path: "/sql-backup",
    subRoutes: sqlBackupRoutes,
  },
  {
    path: "/server",
    subRoutes: serverRoutes,
  },
  {
    path: "/external",
    subRoutes: externalRoutes,
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
