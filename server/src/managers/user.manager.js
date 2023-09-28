import httpStatus from "http-status";
import _ from "lodash";
import ApiError from "../helpers/ApiError.js";
import * as ERROR from "../constants/error.js";
import { User } from "../models/index.js";
import { NOT_FOUND } from "../constants/error.js";
import BaseManager from "./base.manager.js";

class UserManager extends BaseManager {
  constructor() {
    super(User);
  }

  async create(body) {
    if (await User.isUsernameTaken(body.username)) {
      throw new ApiError(httpStatus.BAD_REQUEST, ERROR.ALREADY_TAKEN_USERNAME);
    }
    const data = await User.create({
      ...body,
      password: "1",
    });

    return {
      data: _.omit(data.toJSON(), ["password"]),
    };
  }

  async findOne(id) {
    const data = await this.model.findByPk(id, { attributes: ["id", "username", "type", "createdAt", "updatedAt"] });
    return {
      data,
    };
  }

  async update(id, body) {
    const data = await User.findOne({
      where: { id },
    });
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, NOT_FOUND);
    }
    if (body.email && (await User.isUsernameTaken(body.username, id))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
    }
    Object.assign(data, body);

    await data.save();

    return {
      data: _.omit(data.toJSON(), ["password"]),
    };
  }

  async delete(id) {
    const data = await User.destroy({
      where: { id },
      attributes: ["id", "username", "type", "createdAt", "updatedAt"],
    });
    return {
      data,
    };
  }
}

export default UserManager;
