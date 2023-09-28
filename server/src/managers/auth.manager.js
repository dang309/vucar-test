import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import ApiError from "../helpers/ApiError.js";
import { User } from "../models/index.js";

class AuthManager {
  async login(username, password) {
    const user = await User.findOne({
      where: { username },
    });

    if (!user || !(await User.isPasswordMatch(password, user.password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect username or password!"
      );
    }

    return user;
  }

  async changePassword(id, oldPassword, newPassword) {
    const user = await User.findByPk(id);

    if (!user || !(await User.isPasswordMatch(oldPassword, user.password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Old password is wrong!");
    }

    const hashStr = await bcrypt.hash(newPassword, 10);
    user.password = hashStr;

    await user.save();

    return {
      data: user.id,
    };
  }
}

export default AuthManager;
