import { Sequelize } from "sequelize";
import config from "../config/config.js";

import _tblUser from "./user.model.js";
import _tblCar from "./car.model.js";
import _tblInspectionCriterion from "./inspectionCreterion.model.js";
import _tblInspectionResult from "./inspectionResult.model.js";

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
const InspectionCriterion = _tblInspectionCriterion(sequelize);
const InspectionResult = _tblInspectionResult(sequelize);

InspectionResult.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
});
User.hasMany(InspectionResult, { as: "users", foreignKey: "user_id" });

InspectionResult.belongsTo(Car, {
  as: "car",
  foreignKey: "car_id",
});
Car.hasMany(InspectionResult, { as: "cars", foreignKey: "car_id" });

InspectionResult.belongsTo(InspectionCriterion, {
  as: "criterion",
  foreignKey: "criteria_id",
});
InspectionCriterion.hasMany(InspectionResult, {
  as: "criterion",
  foreignKey: "criteria_id",
});

export { User, InspectionCriterion, Car, InspectionResult };
export default sequelize;
