import { DataTypes, Model } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Car extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = ["id", "model", "car_name", "createdAt", "updatedAt"];

      const { data } = await paginate(models.Car, query, attributes, null, {
        page,
        pageSize,
      });

      return {
        data,
      };
    }
  }

  Car.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT(255),
        allowNull: false,
        primaryKey: true,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "system_id",
      },
      carName: {
        type: DataTypes.STRING,
        field: "car_name",
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
      tableName: "tbl_car",
      timestamps: true,
      paranoid: true,
    }
  );

  return Car;
};
