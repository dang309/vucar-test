import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./config.js";
import { System, User } from "../models/index.js";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findByPk(payload.sub);
    const system = await System.findByPk(payload.systemId);

    if (!user || !system) {
      return done(null, false);
    }
    done(null, { user, system });
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
