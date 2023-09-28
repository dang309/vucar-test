import app from "./app.js";
import config from "./config/config.js";
import logger from "./config/logger.js";
import sequelize from "./models/index.js";

let server;

sequelize
  .authenticate()
  .then(() => logger.info("Connection to database successfully."))
  .then(() => {
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((error) =>
    logger.error(`Unable to connect to the database - ${error}`)
  );

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
