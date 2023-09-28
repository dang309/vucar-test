import upload from "../../config/upload.js";
import { AssetController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";
import downloader from "../../middlewares/downloader.middleware.js";
import transcode from "../../middlewares/transcode.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { ASSET_VALIDATION } from "../../validations/index.js";

const controller = new AssetController();

export default [
  {
    path: "/",
    method: "get",
    handler: controller.find,
    middlewares: [auth],
  },
  {
    path: "/count",
    method: "get",
    handler: controller.count,
    middlewares: [auth],
  },
  {
    path: "/upload/local",
    method: "post",
    handler: controller.create,
    middlewares: [auth, upload.single("image"), transcode],
  },
  {
    path: "/upload/url",
    method: "post",
    handler: controller.create,
    middlewares: [auth, upload.none(), downloader, transcode],
  },

  {
    path: "/:id/extract-face",
    method: "post",
    handler: controller.extractFace,
    middlewares: [auth],
  },

  {
    path: "/:id/verify-face",
    method: "post",
    handler: controller.verifyFace,
    middlewares: [auth],
  },
  {
    path: "/:id",
    method: "get",
    handler: controller.findOne,
    middlewares: [auth],
  },
  {
    path: "/:id",
    method: "patch",
    handler: controller.update,
    middlewares: [auth, validate(ASSET_VALIDATION.update)],
  },

  {
    path: "/:id",
    method: "delete",
    handler: controller.delete,
    middlewares: [auth, validate(ASSET_VALIDATION.delete)],
  },

  {
    path: "/",
    method: "delete",
    handler: controller.deleteMany,
    middlewares: [auth],
  },
];
