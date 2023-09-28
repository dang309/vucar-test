import { DataTypes, Model, UUIDV4 } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Result extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "userId",
        "carId",
        "criterionId",
        "isGood",
        "note",
        "createdAt",
      ];
      const include = [
        {
          model: models.User,
          as: "user",
        },
        {
          model: models.Car,
          as: "car",
        },
        {
          model: models.Criterion,
          as: "criterion",
        },
      ];

      const { data } = await paginate(
        models.Result,
        query,
        attributes,
        include,
        {
          page,
          pageSize,
        }
      );

      return {
        data,
      };
    }
  }

  Result.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
        references: {
          model: "tbl_user",
          key: "id",
        },
      },
      carId: {
        type: DataTypes.INTEGER,
        field: "car_id",
        references: {
          model: "tbl_car",
          key: "id",
        },
      },
      criterionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "criterion_id",
        references: {
          model: "tbl_criterion",
          key: "id",
        },
      },
      isGood: {
        type: DataTypes.BOOLEAN,
        field: "is_good",
        defaultValue: false,
      },
      note: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
      tableName: "tbl_result",
      timestamps: true,
      paranoid: true,
    }
  );

  return Result;
};
