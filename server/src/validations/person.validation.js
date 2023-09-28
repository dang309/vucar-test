import Joi from "joi";

const PERSON_VALIDATION = {
  create: {
    body: Joi.object()
      .keys({
        systemId: Joi.string().required(),
        name: Joi.string().required(),
      })
      .unknown(true),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object().keys({
      systemId: Joi.string(),
      name: Joi.string(),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default PERSON_VALIDATION;
