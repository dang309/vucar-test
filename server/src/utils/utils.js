import moment from "moment";
import fs from "fs-extra";
import { DownloaderHelper } from "node-downloader-helper";
import logger from "../config/logger.js";

class Utility {
  static catchAsync(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
  }

  static generateHierarchyPathByTimestamp(prefix) {
    const utc = moment().utc();
    const year = utc.year();
    const month = utc.month() + 1;
    const day = utc.date();
    const hour = utc.hour();
    const minute = utc.minute();
    const path = `${prefix}/${year}/${month}/${day}/${hour}/${minute}`; // this path is saved in database to serve images
    if (!fs.existsSync(`${global.INFO.STORAGE_PATH}/${path}`)) {
      fs.mkdirSync(`${global.INFO.STORAGE_PATH}/${path}`, { recursive: true }); // this path is to store images
    }
    return path;
  }

  static generateJobTemplate(jobId, jobName, workerData) {
    return {
      name: jobId,
      path: global.INFO.JOB_PATH + jobName,
      worker: {
        workerData,
      },
    };
  }

  static async download(url, storagePath, { fileName }) {
    try {
      const downloader = new DownloaderHelper(url, storagePath, {
        fileName,
        override: true,
      });
      downloader.on("end", () => logger.info("Download Completed"));
      downloader.on("error", (err) => logger.info("Download Failed", err));
      await downloader.start();
      const path = downloader.getDownloadPath();
      const totalSize = await downloader.getTotalSize();
      return {
        path,
        size: totalSize.total,
      };
    } catch (err) {
      return err;
    }
  }
}

export default Utility;
