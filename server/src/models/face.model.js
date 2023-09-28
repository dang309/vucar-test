import { DataTypes, Model, UUIDV4 } from "sequelize";
import fsExtra from "fs-extra";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Face extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "systemId",
        "assetId",
        "personId",
        "posX",
        "posY",
        "width",
        "height",
        "orgWidth",
        "orgHeight",
        "descriptor",
        "path",
        "createdAt",
      ];
      const include = [
        {
          model: models.System,
          as: "system",
        },
        {
          model: models.Person,
          as: "person",
        },
        {
          model: models.Asset,
          as: "asset",
          include: {
            model: models.Face,
            as: "faces",
            attributes: ["id", "width", "height", "posX", "posY", "path"],
          },
        },
      ];

      const { data } = await paginate(models.Face, query, attributes, include, {
        page,
        pageSize,
      });

      return {
        data,
      };
    }
  }

  Face.init(
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
      personId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "person_id",
        references: {
          model: "tbl_person",
          key: "id",
        },
        defaultValue: "1a876dcc-b7b5-41a7-9dcd-bac57fadc195", // anonymous person
      },
      posX: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
        field: "pos_x",
      },
      posY: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
        field: "pos_y",
      },
      width: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      height: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      orgWidth: {
        type: DataTypes.TINYINT,
        allowNull: true,
        field: "org_width",
      },
      orgHeight: {
        type: DataTypes.TINYINT,
        allowNull: true,
        field: "org_height",
      },
      descriptor: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING,
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
      tableName: "tbl_face",
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

  Face.afterDestroy(async ({ path }) => {
    if (fsExtra.existsSync(`${global.INFO.STORAGE_PATH}/${path}`)) {
      await fsExtra.unlink(`${global.INFO.STORAGE_PATH}/${path}`);
    }
  });

  return Face;
};
