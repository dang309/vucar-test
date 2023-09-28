import { parentPort, workerData } from "worker_threads";
import mysqldump from "mysqldump";
import { JOB_STATUS, SQL_BACKUP } from "../constants/job.js";
import config from "../config/config.js";

if (parentPort) {
  parentPort.once("message", (message) => {
    if (message === "cancel") {
      parentPort.postMessage("cancelled");
    }
  });
}

const main = async () => {
  const { id, out } = workerData;

  try {
    await mysqldump({
      connection: {
        host: config.sequelize.dbHost,
        user: config.sequelize.dbUser,
        port: config.sequelize.dbPort,
        password: config.sequelize.dbPassword,
        database: config.sequelize.dbName,
      },
      dumpToFile: out,
    });
    parentPort.postMessage({
      id,
      data: { status: JOB_STATUS.SUCCESS },
      type: SQL_BACKUP,
    });
    parentPort.postMessage("done");
  } catch (error) {
    parentPort.postMessage({
      id,
      data: { status: JOB_STATUS.ERROR },
      type: SQL_BACKUP,
    });
    parentPort.postMessage("done");
  }
};

main();
