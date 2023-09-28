import { DataTypes, Model, UUIDV4 } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Person extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "systemId",
        "name",
        "isDefault",
        "createdAt",
        "updatedAt",
      ];
      const include = {
        model: models.System,
        as: "system",
      };

      const { data } = await paginate(
        models.Person,
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

  Person.init(
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
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        field: "is_default",
        defaultValue: false,
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
      tableName: "tbl_person",
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

  return Person;
};
