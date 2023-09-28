import _ from "lodash";
import httpStatus from "http-status";

import JWTService from "../services/jwt.service.js";
import REST from "../utils/rest.js";
import ApiError from "../helpers/ApiError.js";
import { AuthManager } from "../managers/index.js";

class AuthController {
  constructor() {
    this.authManager = new AuthManager();

    this.login = this.login.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await this.authManager.login(username, password);
    const jwt = await JWTService.issue(user.id);

    return REST.postSuccess(res, {
      data: {
        ..._.omit(user.toJSON(), "password"),
        jwt,
      },
    });
  }

  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.body.user;
    const { data } = await this.authManager.changePassword(
      id,
      oldPassword,
      newPassword
    );

    return REST.postSuccess(res, {
      data,
    });
  }

  async checkToken(req, res) {
    const user = req.body.user;

    if (!user) {
      throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
    }

    return REST.getSuccess(res, {
      data: {
        id: user.id,
      },
    });
  }
}

export default AuthController;
