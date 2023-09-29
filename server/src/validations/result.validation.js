import Joi from "joi";

const RESULT_VALIDATION = {
  create: {
    body: Joi.object().keys({
      isGood: Joi.bool().required(),
      note: Joi.string().allow(null),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object().keys({
      isGood: Joi.bool().default(false),
      note: Joi.string().allow(null),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default RESULT_VALIDATION;
