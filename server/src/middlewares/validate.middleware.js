import Joi from "joi";
import httpStatus from "http-status";
import _ from "lodash";
import ApiError from "../helpers/ApiError.js";

const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "query", "body", "files"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
