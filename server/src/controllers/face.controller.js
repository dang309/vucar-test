import _ from "lodash";
import { FaceManager } from "../managers/index.js";
import BaseController from "./base.controller.js";
import REST from "../utils/rest.js";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/common.js";
import ElsClient from "../utils/elasticSearch.util.js";

const faceManager = new FaceManager();
const elsClient = new ElsClient();

class FaceController extends BaseController {
  constructor() {
    super(faceManager);
    this.faceManager = new FaceManager();
    this.facesOfAssets = this.facesOfAssets.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteMany = this.deleteMany.bind(this);
  }

  async facesOfAssets(req, res) {
    const page = _.parseInt(req.query.page) || DEFAULT_PAGE;
    const pageSize = _.parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;

    const whereCondition = {
      asset_id: req.query.id,
    };

    const result = await this.faceManager.findFacesOfAsset(
      _.parseInt(page, 10),
      _.parseInt(pageSize, 10),
      whereCondition
    );
    return REST.getSuccess(res, result);
  }

  async delete(req, res) {
    const id = req.params.id;
    // const query = {
    //   term: { "asset_id.keyword": id },
    // };
    elsClient.deleteDocument(`${process.env.ELASTIC_SEARCH_INDEX}`, id);
    const result = await this.__manager.delete(id);
    return REST.deleteSuccess(res, result);
  }

  async deleteMany(req, res) {
    const ids = req.body.ids;
    const result = await this.__manager.deleteMany(ids);
    for (const docId of ids) {
      elsClient.deleteDocument(`${process.env.ELASTIC_SEARCH_INDEX}`, docId);
    }
    return REST.deleteSuccess(res, result);
  }
}

export default FaceController;
