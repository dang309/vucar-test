import async from "async";
import httpStatus from "http-status";
import bree from "../config/bree.js";
import logger from "../config/logger.js";
import {
  EXTRACT_FACE,
  MONITORING,
  SQL_BACKUP,
  VERIFY_FACE,
} from "../constants/job.js";
import { FaceManager, SqlBackupManager } from "../managers/index.js";
import ApiError from "../helpers/ApiError.js";
import Utility from "../utils/utils.js";
import ElsClient from "../utils/elasticSearch.util.js";

const sqlBackupManager = new SqlBackupManager();
const faceManager = new FaceManager();

bree.on("worker created", (name) => {
  logger.info(`Created worker ${name}`);
  bree.workers.get(name).on("message", async ({ type, id, data }) => {
    switch (type) {
      case SQL_BACKUP:
        await sqlBackupManager.update(id, data).then(() => {
          global.IO.emit("sql-backup/done");
          global.IO.emit("workers/delete", { name: SQL_BACKUP });
        });
        break;
      case MONITORING:
        global.IO.emit("monitoring/data", data);
        break;
      case EXTRACT_FACE:
      case VERIFY_FACE: {
        if (data) {
          const {
            faces,
            orgSize,
            reserved,
            // faceDescriptorModel,
            // personId,
            // personName,
            // srcOrigPath,
          } = data;
          const { w, h } = orgSize;
          async.parallel(
            faces.map((face) => {
              const dataToCreate = {
                id: face.id,
                path: `${Utility.generateHierarchyPathByTimestamp("faces")}/${
                  face.id
                }.jpg`,
                orgWidth: w,
                orgHeight: h,
                posX: face.x,
                posY: face.y,
                width: face.width,
                height: face.height,
                systemId: reserved.systemId,
                descriptor: face.descriptor,
              };
              const elsClient = new ElsClient();
              elsClient.addDocument(
                `${process.env.ELASTIC_SEARCH_INDEX}`,
                face.id,
                reserved.systemId,
                data.faceDescriptorModel,
                reserved.personId,
                reserved.personName,
                reserved.assetId,
                data.srcOrigPath,
                dataToCreate.posX,
                dataToCreate.posY,
                dataToCreate.width,
                dataToCreate.height,
                dataToCreate.orgWidth,
                dataToCreate.orgHeight,
                dataToCreate.descriptor,
                data.faces[0].descriptor_length
              );
              if (reserved.assetId) {
                dataToCreate.assetId = reserved.assetId;
              }
              if (reserved.personId) {
                dataToCreate.personId = reserved.personId;
              }
              return (cb) => {
                faceManager
                  .create(dataToCreate)
                  .then((res) => cb(null, res.id))
                  .catch((err) => cb(err, null));
              };
            }),
            (err, results) => {
              if (err) {
                throw new ApiError(httpStatus.BAD_REQUEST, err);
              }
              if (type === EXTRACT_FACE) {
                global.IO.emit("extract-face/done");
              }
              if (type === VERIFY_FACE) {
                global.IO.emit("verify-face/done");
              }
            }
          );
        } else {
          global.IO.emit("extract-face/failed");
        }
        break;
      }
      default:
        break;
    }
  });
});

bree.on("worker deleted", (name) => {
  logger.info(`Deleted worker ${name}`);
});
