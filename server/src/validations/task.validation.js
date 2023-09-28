import Joi from "joi";

const TASK_VALIDATION = {
  create: {
    body: Joi.object().keys({
      systemId: Joi.string().required(),
      code: Joi.string().required(),
      type: Joi.string().required(),
      progress: Joi.number()
        .required()
        .min(0, "Progress must be greater than or equal 0!")
        .max(100, "Progress must be less than or equal 100!"),
      status: Joi.string().required().valid("idle", "error", "progress", "done"),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    body: Joi.object().keys({
      systemId: Joi.string(),
      code: Joi.string(),
      type: Joi.string(),
      progress: Joi.string(),
      status: Joi.string().valid("idle", "error", "progress", "done"),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  },
};

export default TASK_VALIDATION;
