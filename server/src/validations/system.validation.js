import Joi from "joi";

const SYSTEM_VALIDATION = {
  create: {
    body: Joi.object()
      .keys({
        securityKey: Joi.string().required(),
        name: Joi.string(),
        desc: Joi.string(),
      })
      .unknown(true),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object().keys({
      securityKey: Joi.string(),
      name: Joi.string(),
      desc: Joi.string(),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default SYSTEM_VALIDATION;
