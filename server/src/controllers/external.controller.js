import { v4 as uuidv4 } from "uuid";
import BaseController from "./base.controller.js";
import worker from "../config/bree.js";
import Utility from "../utils/utils.js";
import REST from "../utils/rest.js";
import AssetManager from "../managers/asset.manager.js";

const assetManager = new AssetManager();

class ExternalController extends BaseController {
  constructor() {
    super(assetManager);
  }

  async verifyFace(req, res) {
    const {
      systemId,
      assetId,
      faceDetectorModel,
      faceDescriptorModel,
      similarityMetric,
      distanceThreshold,
      isIndex,
      callback,
    } = req.body;

    const newAsset = assetManager.create(req.body);

    const storagePath = global.INFO.STORAGE_PATH;

    const workerData = {
      srcOrigPath: `${storagePath}/${newAsset.path}`,
      faceDetectorModel,
      faceDescriptorModel,
      destFacePath: `${storagePath}/${Utility.generateHierarchyPathByTimestamp(
        "faces"
      )}`,
      similarityMetric,
      distanceThreshold,
      isIndex,
      reserved: {
        assetId,
        systemId,
        isIndex,
      },
      callback,
    };

    const uuid = uuidv4();

    await worker.add(
      Utility.generateJobTemplate(uuid, "verifyFace.job.js", workerData)
    );
    await worker.start(uuid);

    return REST.postSuccess(res, { data: { id: assetId } });
  }
}

export default ExternalController;
