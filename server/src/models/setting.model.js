import { DataTypes, Model } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Setting extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = ["id", "code", "value", "title", "desc", "type", "dataType", "createdAt", "updatedAt"];
      const include = null;

      const { data } = await paginate(models.Setting, query, attributes, include, { page, pageSize });

      return {
        data,
      };
    }
  }

  Setting.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT(255),
        allowNull: false,
        primaryKey: true,
      },
      code: {
        type: DataTypes.CHAR(32),
        allowNull: true,
      },
      value: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      options: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      desc: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("private", "public"),
        allowNull: true,
      },
      dataType: {
        type: DataTypes.ENUM("BOOLEAN", "STRING", "DATE", "INTEGER", "DECIMAL", "INTEGER OPTIONS", "STRING OPTIONS"),
        allowNull: true,
        field: "data_type",
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
      tableName: "tbl_setting",
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

  return Setting;
};
