import Joi from "joi";

const MODEL_VALIDATION = {
  create: {
    body: Joi.object().keys({}),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object().keys({
      alias: Joi.string(),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default MODEL_VALIDATION;
