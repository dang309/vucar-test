import { AuthController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import AUTH_VALIDATION from "../../validations/auth.validation.js";

const controller = new AuthController();

export default [
  {
    path: "/login",
    method: "post",
    handler: controller.login,
    middlewares: [validate(AUTH_VALIDATION.login)],
  },
  {
    path: "/change-password",
    method: "post",
    handler: controller.changePassword,
    middlewares: [auth, validate(AUTH_VALIDATION.changePassword)],
  },
];
