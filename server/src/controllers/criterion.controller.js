import { InspectionCriterionManager } from "../managers/index.js";
import BaseController from "./base.controller.js";

class InspectionCriterionController extends BaseController {
  constructor() {
    super(new InspectionCriterionManager());
  }
}

export default InspectionCriterionController;
