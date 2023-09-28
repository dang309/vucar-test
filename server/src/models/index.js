import { Sequelize } from "sequelize";
import config from "../config/config.js";

import _tblUser from "./user.model.js";
import _tblFace from "./face.model.js";
import _tblModel from "./model.model.js";
import _tblPerson from "./person.model.js";
import _tblSetting from "./setting.model.js";
import _tblSystem from "./system.model.js";
import _tblTask from "./task.model.js";
import _tblSqlBackup from "./sqlbackup.model.js";
import _tblAsset from "./asset.model.js";

const sequelize = new Sequelize(
  config.sequelize.dbName,
  config.sequelize.dbUser,
  config.sequelize.dbPassword,
  {
    host: config.sequelize.dbHost,
    port: config.sequelize.dbPort,
    dialect: config.sequelize.dbDialect,
    connectionTimeoutMillis: 10000,
  }
);

const User = _tblUser(sequelize);
const Face = _tblFace(sequelize);
const Model = _tblModel(sequelize);
const Person = _tblPerson(sequelize);
const Setting = _tblSetting(sequelize);
const System = _tblSystem(sequelize);
const Task = _tblTask(sequelize);
const Asset = _tblAsset(sequelize);
const SqlBackup = _tblSqlBackup(sequelize);

Face.belongsTo(User, { as: "created_by_tbl_user", foreignKey: "created_by" });
User.hasMany(Face, { as: "tbl_faces", foreignKey: "created_by" });
Face.belongsTo(User, { as: "updated_by_tbl_user", foreignKey: "updated_by" });
User.hasMany(Face, { as: "updated_by_tbl_faces", foreignKey: "updated_by" });
Model.belongsTo(User, { as: "created_by_tbl_user", foreignKey: "created_by" });
User.hasMany(Model, { as: "tbl_models", foreignKey: "created_by" });
Model.belongsTo(User, { as: "updated_by_tbl_user", foreignKey: "updated_by" });
User.hasMany(Model, { as: "updated_by_tbl_models", foreignKey: "updated_by" });
Person.belongsTo(User, { as: "created_by_tbl_user", foreignKey: "created_by" });
User.hasMany(Person, { as: "tbl_people", foreignKey: "created_by" });
Person.belongsTo(User, { as: "updated_by_tbl_user", foreignKey: "updated_by" });
User.hasMany(Person, { as: "updated_by_tbl_people", foreignKey: "updated_by" });
Setting.belongsTo(User, {
  as: "created_by_tbl_user",
  foreignKey: "created_by",
});
User.hasMany(Setting, { as: "tbl_settings", foreignKey: "created_by" });
Setting.belongsTo(User, {
  as: "updated_by_tbl_user",
  foreignKey: "updated_by",
});
User.hasMany(Setting, {
  as: "updated_by_tbl_settings",
  foreignKey: "updated_by",
});
System.belongsTo(User, { as: "created_by_tbl_user", foreignKey: "created_by" });
User.hasMany(System, { as: "tbl_systems", foreignKey: "created_by" });
System.belongsTo(User, { as: "updated_by_tbl_user", foreignKey: "updated_by" });
User.hasMany(System, {
  as: "updated_by_tbl_systems",
  foreignKey: "updated_by",
});
Task.belongsTo(User, { as: "created_by_tbl_user", foreignKey: "created_by" });
User.hasMany(Task, { as: "tbl_tasks", foreignKey: "created_by" });
Task.belongsTo(User, { as: "updated_by_tbl_user", foreignKey: "updated_by" });
User.hasMany(Task, { as: "updated_by_tbl_tasks", foreignKey: "updated_by" });
Face.belongsTo(Person, { as: "person", foreignKey: "person_id" });
Person.hasMany(Face, { as: "tbl_faces", foreignKey: "person_id" });
Face.belongsTo(System, { as: "system", foreignKey: "system_id" });
System.hasMany(Face, { as: "tbl_faces", foreignKey: "system_id" });
Task.belongsTo(System, { as: "system", foreignKey: "system_id" });
System.hasMany(Task, { as: "tbl_tasks", foreignKey: "system_id" });
System.hasMany(Person, { as: "tbl_people", foreignKey: "system_id" });
Person.belongsTo(System, { as: "system", foreignKey: "system_id" });
System.hasMany(Asset, { as: "tbl_asset", foreignKey: "system_id" });
Asset.belongsTo(System, { as: "system", foreignKey: "system_id" });
SqlBackup.belongsTo(User, {
  as: "created_by_tbl_sql_backup",
  foreignKey: "created_by",
});
User.hasMany(SqlBackup, {
  as: "created_by_tbl_user",
  foreignKey: "created_by",
});
Face.belongsTo(Asset, { as: "asset", foreignKey: "asset_id" });
Asset.hasMany(Face, { as: "faces", foreignKey: "asset_id" });

export { User, Model, Task, Face, Person, Setting, System, Asset, SqlBackup };
export default sequelize;
