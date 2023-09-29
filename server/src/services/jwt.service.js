import jwt from "jsonwebtoken";
import config from "../config/config.js";

class JWTService {
  static async issue(userId) {
    const payload = {
      iss: "Dang Nguyen",
      sub: userId,
    };
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: `${config.jwt.expirationHours}h`,
    });
  }

  static async verify(token) {
    return jwt.verify(token, config.jwt.secret);
  }
}

export default JWTService;
