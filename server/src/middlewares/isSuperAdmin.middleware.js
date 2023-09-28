import httpStatus from "http-status";

import { USER_TYPE } from "../constants/user.js";
import { INSUFFICIENT_PERMISSION } from "../constants/error.js";

import ApiError from "../helpers/ApiError.js";

const isSuperAdmin = (req, _, next) => {
  const user = req.body.user;
  if (user && user.id) {
    if (user.type < USER_TYPE.SUPER_ADMIN) {
      return next(new ApiError(httpStatus.FORBIDDEN, INSUFFICIENT_PERMISSION));
    }
    return next();
  }
  return next(new ApiError(httpStatus.FORBIDDEN, INSUFFICIENT_PERMISSION));
};

export default isSuperAdmin;
