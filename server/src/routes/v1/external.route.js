import { ExternalController, FaceController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";
import downloader from "../../middlewares/downloader.middleware.js";
import transcode from "../../middlewares/transcode.middleware.js";

const faceController = new FaceController();
const externalController = new ExternalController();

export default [
  {
    method: "get",
    path: "/faces",
    handler: faceController.find,
    middlewares: [auth],
  },
  {
    method: "delete",
    path: "/faces/:id",
    handler: faceController.delete,
    middlewares: [auth],
  },
  {
    path: "/faces/:id/data",
    method: "get",
    handler: faceController.find,
    middlewares: [auth],
  },
  {
    path: "/assets/verify-face",
    method: "post",
    handler: externalController.verifyFace,
    middlewares: [auth, downloader, transcode],
  },
];
