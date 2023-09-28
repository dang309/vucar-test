import { InspectionResultManager } from "../managers/index.js";
import BaseController from "./base.controller.js";

class InspectionResultController extends BaseController {
  constructor() {
    super(new InspectionResultManager());
  }
}

export default InspectionResultController;
