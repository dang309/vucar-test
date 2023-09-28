import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
import { Server } from "socket.io";
import os from "os";
import app from "./app.js";
import config from "./config/config.js";
import logger from "./config/logger.js";
import sequelize from "./models/index.js";
import ElsClient from "./utils/elasticSearch.util.js";
import "./jobs/index.js";
import SocketService from "./services/socket.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.IO = io;

global.INFO = {};
global.INFO.sAdminId = 1;
global.INFO.anonymousId = 2;
global.INFO.ROOT_PATH = __dirname;
global.INFO.JOB_PATH = `${global.INFO.ROOT_PATH}/jobs/`;
global.INFO.TEMP_PATH = os.tmpdir();
global.INFO.STORAGE_PATH = `${process.cwd()}/storage`;
global.INFO.BACKUP_PATH = `${global.INFO.STORAGE_PATH}/backup`;
global.INFO.ASSET_PATH = `${global.INFO.STORAGE_PATH}/assets`;
global.INFO.tmpStoragePath =
  process.env.TMP_STORAGE || global.INFO.rootPath + config.paths.tmp;

const elsClient = new ElsClient();
elsClient.init();

io.on("connection", async (socket) => {
  const socketIOService = new SocketService();
  socket.on("monitoring/start", socketIOService.monitor);
  socket.on("disconnect", () => {
    logger.info("user disconnected");
  });
});

sequelize
  .authenticate()
  .then(() => logger.info("Connection to database successfully."))
  .then(() => {
    server.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
      elsClient.createElasticsearchIndex();
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
