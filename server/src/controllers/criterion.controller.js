import { CriterionManager } from "../managers/index.js";
import BaseController from "./base.controller.js";

class CriterionController extends BaseController {
  constructor() {
    super(new CriterionManager());
  }
}

export default CriterionController;
