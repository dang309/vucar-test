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

  static groupByParent(arr) {
    const result = [];
    const genMenuData = (list, origin, level) => {
      for (let i = 0; i < list.length; i += 1) {
        const children = origin
          .filter((x) => x.parent === list[i].id)
          .map((o) => ({
            ...o.toJSON(),
            level,
          }));
        if (children.length > 0) {
          list[i].children = children;
          genMenuData(list[i].children, origin, level + 1);
        } else if (list[i].children) {
          delete list[i].children;
        }
      }
    };

    const folderRoot = arr
      .filter((x) => x.parent === null)
      .map((o) => ({
        ...o.toJSON(),
        level: 1,
      }));
    result.push(...folderRoot);
    genMenuData(result, arr, 2);
    return result;
  }

  findRootParent(arr, item) {
    if (!item.parent) return item;
    const obj = arr.find((o) => o.id === item.parent);
    return this.findRootParent(obj);
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
