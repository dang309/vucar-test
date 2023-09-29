import { ResultManager } from "../managers/index.js";
import BaseController from "./base.controller.js";

class ResultController extends BaseController {
  constructor() {
    super(new ResultManager());
  }
}

export default ResultController;
