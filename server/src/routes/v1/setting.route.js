import { SettingController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import SETTING_VALIDATION from "../../validations/setting.validation.js";

const controller = new SettingController();

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
    middlewares: [auth, validate(SETTING_VALIDATION.create)],
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
    middlewares: [auth, validate(SETTING_VALIDATION.update)],
  },

  {
    path: "/:id",
    method: "delete",
    handler: controller.delete,
    middlewares: [auth, validate(SETTING_VALIDATION.delete)],
  },
];