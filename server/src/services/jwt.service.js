import jwt from "jsonwebtoken";
import config from "../config/config.js";

class JWTService {
  static async issue(userId) {
    const payload = {
      iss: "S3LAB",
      sub: userId,
      systemId: "248593b3-148c-4d6e-aa3d-2dd3496dec31",
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
