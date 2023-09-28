import httpStatus from "http-status";
import config from "../config/config.js";
import logger from "../config/logger.js";
import ApiError from "../helpers/ApiError.js";

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.code
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { code, message } = err;
  if (config.env === "production" && !err.isOperational) {
    code = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    error: {
      code,
      message,
      ...(config.env === "development" && {
        errors: err.stack ? err.stack.split("\n") : [],
      }),
    },
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(code).send(response);
};

export { errorConverter, errorHandler };
