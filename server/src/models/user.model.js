import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";
import HTTP_STATUS from "http-status";
import ApiError from "../helpers/ApiError.js";
import { USER_TYPE } from "../constants/user.js";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class User extends Model {
    static async isUsernameTaken(username) {
      const user = await this.findOne({
        where: { username },
      });
      return !!user;
    }

    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "username",
        "type",
        "isDefault",
        "createdAt",
        "updatedAt",
      ];
      const include = null;

      const { data } = await paginate(models.User, query, attributes, include, {
        page,
        pageSize,
      });

      return {
        data,
      };
    }

    static async isPasswordMatch(hash, password) {
      return bcrypt.compare(hash, password);
    }
  }

  User.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.CHAR(128),
        allowNull: true,
      },
      role: {
        type: DataTypes.TINYINT(255),
        defaultValue: USER_TYPE.MECHANICAL,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      tableName: "tbl_user",
      timestamps: true,
      paranoid: true,
    }
  );

  User.beforeCreate(async (user) => {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, err);
      });
  });

  return User;
};
