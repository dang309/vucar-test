import Joi from "joi";
import { password } from "./custom.validation.js";

const AUTH_VALIDATION = {
  login: {
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  changePassword: {
    body: Joi.object().keys({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required().custom(password),
    }),
  },
};

export default AUTH_VALIDATION;
