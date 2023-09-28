import Joi from "joi";

const SYSTEM_VALIDATION = {
  create: {
    body: Joi.object()
      .keys({
        isGood: Joi.bool().required(),
        note: Joi.string(),
      })
      .unknown(true),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object().keys({
      isGood: Joi.bool().default(false),
      note: Joi.string(),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default SYSTEM_VALIDATION;
