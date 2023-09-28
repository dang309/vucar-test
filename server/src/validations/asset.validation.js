import Joi from "joi";

const ASSET_VALIDATION = {
  create: {
    body: Joi.object().keys({
      images: Joi.binary()
    }),
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

export default ASSET_VALIDATION;
