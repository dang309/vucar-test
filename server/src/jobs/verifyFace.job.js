import { parentPort, workerData } from "worker_threads";
import { VERIFY_FACE } from "../constants/job.js";
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
    faceDetectorModel,
    faceDescriptorModel,
    destFacePath,
    similarityMetric,
    distanceThreshold,
    isIndex,
    reserved,
    callback,
  } = workerData;

  try {
    const { faces, orgSize } = await SFaceAIEngineService.verify(
      srcOrigPath,
      faceDetectorModel,
      faceDescriptorModel,
      destFacePath,
      similarityMetric,
      distanceThreshold,
      isIndex,
      reserved,
      callback
    );

    parentPort.postMessage({
      data: { faces, orgSize, reserved, destFacePath },
      type: VERIFY_FACE,
    });
    parentPort.postMessage("done");
  } catch (error) {
    parentPort.postMessage({
      data: null,
      type: VERIFY_FACE,
    });
    parentPort.postMessage("done");
  }
};

main();
