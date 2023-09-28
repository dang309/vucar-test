import Joi from "joi";

const SETTING_VALIDATION = {
  create: {
    body: Joi.object().keys({
      code: Joi.string().required(),
      title: Joi.string().required(),
      desc: Joi.string().required(),
      type: Joi.string().required().valid("public", "private"),
      dataType: Joi.number().required(),
      value: Joi.string().required(),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
    body: Joi.object().keys({
      code: Joi.string(),
      title: Joi.string(),
      desc: Joi.string(),
      type: Joi.string().valid("public", "private"),
      dataType: Joi.number(),
      value: Joi.string(),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default SETTING_VALIDATION;
