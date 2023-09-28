import { InspectionResult } from "../models/index.js";
import BaseManager from "./base.manager.js";

class InspectionResultManager extends BaseManager {
  constructor() {
    super(InspectionResult);
  }
}

export default InspectionResultManager;
