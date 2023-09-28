import Sequelize, { DataTypes, UUIDV4 } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Model extends Sequelize.Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "title",
        "isActivated",
        "isDefault",
        "path",
        "status",
        "type",
        "progress",
        "alias",
        "createdAt",
        "updatedAt",
      ];
      const include = null;

      const { data } = await paginate(
        models.Model,
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

  Model.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4(),
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      alias: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        field: "is_activated",
        defaultValue: 0,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        field: "is_default",
        defaultValue: 0,
      },
      path: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("error", "idle", "progress", "done"),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("FACE_HOG", "FACE_HAARLIKE", "FACE_SDNN"),
        allowNull: true,
      },
      progress: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
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
      tableName: "tbl_model",
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

  return Model;
};
