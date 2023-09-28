import ModelManager from "../managers/model.manager.js";
import BaseController from "./base.controller.js";

class ModelController extends BaseController {
  constructor() {
    super(new ModelManager());
  }
}

export default ModelController;
