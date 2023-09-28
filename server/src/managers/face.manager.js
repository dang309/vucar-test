import { Face } from "../models/index.js";
import BaseManager from "./base.manager.js";

class FaceManager extends BaseManager {
  constructor() {
    super(Face);
  }

  async findFacesOfAsset(page = 1, pageSize = 8, whereCondition) {
    const query = { order: [["createdAt", "desc"]], attributes: ["assetId"] };
    if (whereCondition.asset_id !== undefined) {
      query.where = { asset_id: whereCondition.asset_id };
    }
    const { data } = await this.model.paginate(query, { page, pageSize });
    return { data };
  }
}

export default FaceManager;
