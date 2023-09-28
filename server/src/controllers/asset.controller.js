import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import { AssetManager } from "../managers/index.js";
import ApiError from "../helpers/ApiError.js";
import BaseController from "./base.controller.js";
import worker from "../config/bree.js";
import Utility from "../utils/utils.js";
import REST from "../utils/rest.js";

const assetManager = new AssetManager();

class AssetController extends BaseController {
  constructor() {
    super(assetManager);
  }

  async extractFace(req, res) {
    const id = req.params.id;
    const { data: asset } = await assetManager.findOne(id);
    if (!asset) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Not Found Asset!");
    }
    const {
      faceDetectorModel,
      faceDescriptorModel,
      personId,
      personName,
      isIndex,
      callback,
    } = req.body;

    //  form url encode

    const storagePath = global.INFO.STORAGE_PATH;

    const workerData = {
      id,
      assetPath: asset.path,
      srcOrigPath: `${storagePath}/${asset.path}`,
      faceDetectorModel,
      faceDescriptorModel,
      destFacePath: `${storagePath}/${Utility.generateHierarchyPathByTimestamp(
        "faces"
      )}`,
      reserved: {
        assetId: id,
        systemId: asset.systemId,
        personId,
        personName,
      },
      isIndex,
      callback,
    };

    const uuid = uuidv4();

    await worker.add(
      Utility.generateJobTemplate(uuid, "extractFace.job.js", workerData)
    );
    await worker.start(uuid);
    const assetPath = workerData.assetPath;

    return REST.postSuccess(res, { data: { id, assetPath } });
  }

  async verifyFace(req, res) {
    const id = req.params.id;

    const { data: asset } = await assetManager.findOne(id);
    if (!asset) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Not Found Asset!");
    }

    const {
      faceDetectorModel,
      faceDescriptorModel,
      similarityMetric,
      distanceThreshold,
      isIndex,
    } = req.body;

    const storagePath = global.INFO.STORAGE_PATH;

    const workerData = {
      srcOrigPath: `${storagePath}/${asset.path}`,
      faceDetectorModel,
      faceDescriptorModel,
      destFacePath: `${storagePath}/${Utility.generateHierarchyPathByTimestamp(
        "faces"
      )}`,
      similarityMetric,
      distanceThreshold,
      isIndex,
      reserved: {
        assetId: id,
        systemId: asset.systemId,
        isIndex,
      },
    };

    const uuid = uuidv4();

    await worker.add(
      Utility.generateJobTemplate(uuid, "verifyFace.job.js", workerData)
    );
    await worker.start(uuid);

    return REST.postSuccess(res, { data: { id } });
  }
}

export default AssetController;
