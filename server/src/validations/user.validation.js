import Joi from "joi";

const USER_VALIDATION = {
  create: {
    body: Joi.object()
      .keys({
        username: Joi.string().required(),
        type: Joi.number().required(),
      })
      .unknown(true),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object()
      .keys({
        username: Joi.string(),
        type: Joi.number(),
      })
      .unknown(true),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default USER_VALIDATION;
