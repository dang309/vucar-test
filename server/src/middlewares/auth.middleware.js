import passport from "passport";
import httpStatus from "http-status";
import ApiError from "../helpers/ApiError.js";

const verifyCallback = (req, resolve, reject) => async (err, data, info) => {
  if (err || info || !data) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, err || info));
  }
  req.body = {
    ...req.body,
    ...data,
  };

  resolve();
};

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
