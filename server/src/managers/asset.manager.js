import { Asset } from "../models/index.js";
import BaseManager from "./base.manager.js";

class AssetManager extends BaseManager {
  constructor() {
    super(Asset);
  }
}

export default AssetManager;
