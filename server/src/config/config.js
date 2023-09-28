import dotenv from "dotenv";

dotenv.config();

export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  webRoot: process.env.WEB_ROOT_URL,
  apiRoot: process.env.API_ROOT_URL,
  sequelize: {
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_POST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbDialect: process.env.DB_DIALECT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationHours: process.env.JWT_EXPIRATION_HOURS,
  },
};
