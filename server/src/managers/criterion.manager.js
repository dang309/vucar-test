import { Criterion } from "../models/index.js";
import BaseManager from "./base.manager.js";

class CriterionManager extends BaseManager {
  constructor() {
    super(Criterion);
  }
}

export default CriterionManager;
