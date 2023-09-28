import axios from "axios";
import httpStatus from "http-status";
import ApiError from "../helpers/ApiError.js";

class SFaceAIEngine {
  static async represent(
    srcOrigPath,
    faceDetectorModel,
    faceDescriptorModel,
    destFacePath,
    reserved,
    isIndex,
    callback
  ) {
    try {
      const res = await axios.post(
        `${process.env.SFACE_AI_ENGINE_API_ROOT}/sface-engine/v1/represent`,
        {
          src_orig_path: srcOrigPath,
          face_detect_model: faceDetectorModel,
          face_desc_model: faceDescriptorModel,
          dest_face_path: destFacePath,
          person_id: reserved.personId,
          person_name: reserved.personName,
          reserved,
          is_index: isIndex ? 1 : 0,
          callback,
        }
      );
      if (res.data.result === "success") {
        const { faces, orig_size: orgSize, descriptor_length: descLength } = res.data.data;

        return {
          faces,
          orgSize,
          descLength,
        };
      }
      throw new ApiError(httpStatus.BAD_REQUEST, "Extract Failed!");
    } catch (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
  }

  static async verify(
    srcOrigPath,
    faceDetectorModel,
    faceDescriptorModel,
    destFacePath,
    similarityMetric,
    distanceThreshold,
    isIndex,
    reserved,
    callback
  ) {
    try {
      const { assetId, systemId } = reserved;

      const res = await axios.post(
        `${process.env.SFACE_AI_ENGINE_API_ROOT}/sface-engine/v1/verification`,
        {
          src_orig_path: srcOrigPath,
          face_detect_model: faceDetectorModel,
          face_desc_model: faceDescriptorModel,
          dest_face_path: destFacePath,
          similarity_metric: similarityMetric,
          distance_threshold: distanceThreshold,
          is_index: isIndex ? 1 : 0,
          reserved: {
            asset_id: assetId,
            system_id: systemId,
            is_index: isIndex ? 1 : 0,
          },
          callback,
        }
      );

      if (res.data.result === "success") {
        const { faces, orig_size: orgSize } = res.data.data;

        return {
          faces,
          orgSize,
        };
      }
      throw new ApiError(httpStatus.BAD_REQUEST, "Verify Failed!");
    } catch (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
  }
}

export default SFaceAIEngine;
