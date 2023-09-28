import { DataTypes, Model } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Criterion extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = ["id", "name", "parent", "createdAt", "updatedAt"];

      const { data } = await paginate(
        models.Criterion,
        query,
        attributes,
        null,
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

  Criterion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tbl_criterion",
          key: "id",
        },
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
      tableName: "tbl_criterion",
      timestamps: true,
      paranoid: true,
    }
  );

  return Criterion;
};
