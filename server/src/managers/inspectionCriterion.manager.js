import { InspectionCriterion } from "../models/index.js";
import BaseManager from "./base.manager.js";

class InspectionCriterionManager extends BaseManager {
  constructor() {
    super(InspectionCriterion);
  }
}

export default InspectionCriterionManager;
