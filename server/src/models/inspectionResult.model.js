import { DataTypes, Model, UUIDV4 } from "sequelize";
import fsExtra from "fs-extra";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class InspectionResult extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "userId",
        "carId",
        "criteriaId",
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
          model: models.InspectionCriterion,
          as: "inspectionCriterion",
        },
      ];

      const { data } = await paginate(
        models.InspectionResult,
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

  InspectionResult.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4(),
      },
      userId: {
        type: DataTypes.NUMBER,
        allowNull: true,
        field: "user_id",
        references: {
          model: "tbl_user",
          key: "id",
        },
      },
      carId: {
        type: DataTypes.NUMBER,
        allowNull: true,
        field: "car_id",
        references: {
          model: "tbl_car",
          key: "id",
        },
      },
      personId: {
        type: DataTypes.NUMBER,
        allowNull: true,
        field: "creteria_id",
        references: {
          model: "tbl_inspection_criterion",
          key: "id",
        },
      },
      isGood: {
        type: DataTypes.BOOLEAN,
        field: "is_good",
        defaultValue: false,
      },
      note: {
        type: DataTypes.STRING,
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
      tableName: "tbl_inspection_result",
      timestamps: true,
      paranoid: true,
    }
  );

  return InspectionResult;
};
