import { DataTypes, Model } from "sequelize";
import { paginate } from "./helpers/paginate.js";

export default (sequelize) => {
  class Task extends Model {
    static async paginate(query, { page, pageSize }) {
      const { models } = sequelize;

      const attributes = [
        "id",
        "systemId",
        "jobCode",
        "taskCode",
        "status",
        "progress",
        "jobType",
        "taskType",
        "createdAt",
        "updatedAt",
      ];
      const include = {
        model: models.System,
        as: "system",
      };

      const { data } = await paginate(models.Task, query, attributes, include, { page, pageSize });

      return {
        data,
      };
    }
  }

  Task.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT(255),
        allowNull: false,
        primaryKey: true,
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
      jobCode: {
        type: DataTypes.STRING,
        field: "job_code",
        allowNull: true,
      },
      taskCode: {
        type: DataTypes.STRING,
        field: "task_code",
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("error", "idle", "progress", "done"),
        allowNull: true,
      },
      progress: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      taskType: {
        type: DataTypes.ENUM(
          "get_data",
          "face_detection",
          "face_extract",
          "face_analysis",
          "face_verification",
          "face_storage",
          "face_index"
        ),
        field: "task_type",
        allowNull: true,
      },
      jobType: {
        type: DataTypes.ENUM("face_ingest", "face_detection", "face_analysis", "face_verification", "person_ingest"),
        field: "job_type",
        allowNull: true,
      },
      data: {
        type: DataTypes.JSON,
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
      tableName: "tbl_task",
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

  return Task;
};
