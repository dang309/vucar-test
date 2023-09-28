import { UserController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";
import isSuperAdmin from "../../middlewares/isSuperAdmin.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import USER_VALIDATION from "../../validations/user.validation.js";

const controller = new UserController();

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
    middlewares: [auth, isSuperAdmin, validate(USER_VALIDATION.create)],
  },
  {
    path: "/me",
    method: "get",
    handler: controller.me,
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
    middlewares: [auth, isSuperAdmin, validate(USER_VALIDATION.update)],
  },

  {
    path: "/:id",
    method: "delete",
    handler: controller.delete,
    middlewares: [auth, isSuperAdmin, validate(USER_VALIDATION.delete)],
  },

  {
    path: "/",
    method: "delete",
    handler: controller.deleteMany,
    middlewares: [auth],
  },
];
