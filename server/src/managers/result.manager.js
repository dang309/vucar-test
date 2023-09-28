import { Result } from "../models/index.js";
import BaseManager from "./base.manager.js";

class ResultManager extends BaseManager {
  constructor() {
    super(Result);
  }
}

export default ResultManager;
