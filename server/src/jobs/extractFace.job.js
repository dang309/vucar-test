import { parentPort, workerData } from "worker_threads";
import { EXTRACT_FACE } from "../constants/job.js";
import SFaceAIEngineService from "../services/sfaceAIEngine.service.js";

if (parentPort) {
  parentPort.once("message", (message) => {
    if (message === "cancel") {
      parentPort.postMessage("cancelled");
    }
  });
}

const main = async () => {
  const {
    srcOrigPath,
    // assetPath,
    faceDetectorModel,
    faceDescriptorModel,
    destFacePath,
    reserved,
    isIndex,
    callback,
  } = workerData;

  try {
    const { faces, orgSize, descLength } = await SFaceAIEngineService.represent(
      srcOrigPath,
      faceDetectorModel,
      faceDescriptorModel,
      destFacePath,
      reserved,
      isIndex,
      callback
    );

    parentPort.postMessage({
      data: { faces, orgSize, reserved, destFacePath, descLength, faceDescriptorModel, srcOrigPath },
      type: EXTRACT_FACE,
    });
    parentPort.postMessage("done");
  } catch (error) {
    parentPort.postMessage({
      data: null,
      type: EXTRACT_FACE,
    });
    parentPort.postMessage("done");
  }
};

main();
