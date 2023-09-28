import { DataTypes, Model, UUIDV4 } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class InspectionCriterion extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "criteriaName",
        "criteriaLevel",
        "createdAt",
        "updatedAt",
      ];

      const { data } = await paginate(models.Asset, query, attributes, null, {
        page,
        pageSize,
      });

      return {
        data,
      };
    }
  }

  InspectionCriterion.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4(),
      },
      criteriaName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "criteria_name",
      },
      criteriaLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "criteria_level",
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
      tableName: "tbl_inspection_criterion",
      timestamps: true,
      paranoid: true,
    }
  );

  return InspectionCriterion;
};
