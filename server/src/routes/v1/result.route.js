import { ResultController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { RESULT_VALIDATION } from "../../validations/index.js";

const controller = new ResultController();

export default [
  {
    path: "/",
    method: "get",
    handler: controller.find,
    middlewares: [auth],
  },
  {
    path: "/",
    method: "post",
    handler: controller.create,
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
    middlewares: [auth, validate(RESULT_VALIDATION.update)],
  },

  {
    path: "/:id",
    method: "delete",
    handler: controller.delete,
    middlewares: [auth, validate(RESULT_VALIDATION.delete)],
  },

  {
    path: "/",
    method: "delete",
    handler: controller.deleteMany,
    middlewares: [auth],
  },
];
