import { DataTypes, Model, UUIDV4 } from "sequelize";
import fsExtra from "fs-extra";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Asset extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "systemId",
        "assetId",
        "originalName",
        "size",
        "width",
        "height",
        "path",
        "thumbPath",
        "createdAt",
        "updatedAt",
      ];
      const include = [
        {
          model: models.System,
          as: "system",
        },
        {
          model: models.Face,
          as: "faces",
          attributes: ["id", "width", "height", "posX", "posY", "path"],
        },
      ];

      const { data } = await paginate(
        models.Asset,
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

  Asset.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4(),
      },
      systemId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "system_id",
        references: {
          model: "tbl_system",
          key: "id",
        },
      },
      assetId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "asset_id",
      },
      originalName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "original_name",
      },
      size: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      width: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      height: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      thumbPath: {
        type: DataTypes.STRING(128),
        field: "thumb_path",
        allowNull: true,
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
      tableName: "tbl_asset",
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

  Asset.afterDestroy(async ({ path, thumbPath }) => {
    if (fsExtra.existsSync(`${global.INFO.STORAGE_PATH}/${path}`)) {
      await fsExtra.unlink(`${global.INFO.STORAGE_PATH}/${path}`);
    }
    if (fsExtra.existsSync(`${global.INFO.STORAGE_PATH}/${thumbPath}`)) {
      await fsExtra.unlink(`${global.INFO.STORAGE_PATH}/${thumbPath}`);
    }
  });

  return Asset;
};
