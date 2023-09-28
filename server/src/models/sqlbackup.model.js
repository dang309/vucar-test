import { DataTypes, Model, UUIDV4 } from "sequelize";
import fsExtra from "fs-extra";
import worker from "../config/bree.js";
import Utility from "../utils/utils.js";
import { paginate } from "./helpers/paginate.js";
import { SQL_BACKUP } from "../constants/job.js";

export default (sequelize) => {
  class SqlBackup extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = ["id", "name", "status", "createdBy", "createdAt"];
      const include = null;

      const { data } = await paginate(
        models.SqlBackup,
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

  SqlBackup.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4(),
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("success", "progress", "error", "waiting"),
        defaultValue: "progress",
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
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: new Date(),
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
      tableName: "tbl_sql_backup",
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

  SqlBackup.afterCreate(async ({ id, name }) => {
    const out = `${global.INFO.BACKUP_PATH}/${name}.sql`;
    global.IO.emit("workers/add", { name: SQL_BACKUP });
    await worker.add(
      Utility.generateJobTemplate(id, "dbBackup.job.js", { id, name, out })
    );
    await worker.start(id);
  });

  SqlBackup.afterDestroy(async ({ name }) => {
    const out = `${global.INFO.BACKUP_PATH}/${name}.sql`;
    if (fsExtra.existsSync(out)) {
      await fsExtra.unlink(out);
    }
  });

  return SqlBackup;
};
