import { Sequelize } from "sequelize";
import config from "../config/config.js";

import _tblUser from "./user.model.js";
import _tblCar from "./car.model.js";
import _tblCriterion from "./creterion.model.js";
import _tblResult from "./result.model.js";

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
const Car = _tblCar(sequelize);
const Criterion = _tblCriterion(sequelize);
const Result = _tblResult(sequelize);

Result.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
});
User.hasMany(Result, { as: "users", foreignKey: "user_id" });

Result.belongsTo(Car, {
  as: "car",
  foreignKey: "car_id",
});
Car.hasMany(Result, { as: "cars", foreignKey: "car_id" });

Result.belongsTo(Criterion, {
  as: "criterion",
  foreignKey: "criterion_id",
});
Criterion.hasMany(Result, {
  as: "criterion",
  foreignKey: "criterion_id",
});

export { User, Criterion, Car, Result };

export default sequelize;
