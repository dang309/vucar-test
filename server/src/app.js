import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import httpStatus from "http-status";
import methodOverride from "method-override";
import config from "./config/config.js";
import morgan from "./config/morgan.js";
import { jwtStrategy } from "./config/passport.js";
import { authLimiter } from "./middlewares/rateLimiter.middleware.js";
import routes from "./routes/v1/index.js";
import {
  errorConverter,
  errorHandler,
} from "./middlewares/error.middleware.js";
import ApiError from "./helpers/ApiError.js";

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "'unsafe-eval'"],
      },
    },
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride("X-HTTP-Method-Override"));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
