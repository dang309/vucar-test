import { Model } from "../models/index.js";
import BaseManager from "./base.manager.js";

class ModelManager extends BaseManager {
  constructor() {
    super(Model);
  }
}

export default ModelManager;
