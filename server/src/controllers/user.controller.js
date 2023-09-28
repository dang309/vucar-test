import httpStatus from "http-status";
import { UserManager } from "../managers/index.js";
import ApiError from "../helpers/ApiError.js";
import REST from "../utils/rest.js";
import BaseController from "./base.controller.js";
import { NOT_FOUND } from "../constants/error.js";

class UserController extends BaseController {
  constructor() {
    super(new UserManager());

    this.userManager = new UserManager();

    this.me = this.me.bind(this);
  }

  async me(req, res) {
    const user = req.body.user;
    const { id } = user;
    const result = await this.userManager.findOne(id);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, NOT_FOUND);
    }
    return REST.getSuccess(res, result);
  }
}

export default UserController;
