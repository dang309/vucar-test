import Joi from "joi";

const FACE_VALIDATION = {
  create: {
    body: Joi.object().keys({}),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object().keys({}),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default FACE_VALIDATION;
