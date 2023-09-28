import { ServerController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";

const controller = new ServerController();

export default [
  {
    path: "/information",
    method: "get",
    handler: controller.getInformation,
    middlewares: [auth],
  },
];
