import { DataTypes, Model, UUIDV4 } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class System extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "securityKey",
        "name",
        "desc",
        "isDefault",
        "createdAt",
        "updatedAt",
      ];
      const include = null;

      const { data } = await paginate(
        models.System,
        query,
        attributes,
        include,
        { page, pageSize }
      );

      return {
        data,
      };
    }
  }

  System.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4(),
      },
      securityKey: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "security_key",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      desc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        field: "is_default",
      },
      createdBy: {
        type: DataTypes.BIGINT(255),
        allowNull: true,
        field: "created_by",
        references: {
          model: "tbl_user",
          key: "id",
        },
      },
      updatedBy: {
        type: DataTypes.BIGINT(255),
        allowNull: true,
        field: "updated_by",
        references: {
          model: "tbl_user",
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
      tableName: "tbl_system",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  return System;
};
