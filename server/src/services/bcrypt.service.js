import bcrypt from "bcryptjs";
import HTTP_STATUS from "http-status";
import ApiError from "../helpers/ApiError.js";

const hash = async (password) => {
  return bcrypt
    .hash(password, 10)
    .then((hashStr) => {
      return hashStr;
    })
    .catch((err) => {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, err);
    });
};

const compare = async (hashStr, password) => {
  return bcrypt.compare(hashStr, password);
};

export { hash, compare };
