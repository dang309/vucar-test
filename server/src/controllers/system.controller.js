import SystemManager from "../managers/system.manager.js";
import BaseController from "./base.controller.js";

class SystemController extends BaseController {
  constructor() {
    super(new SystemManager());
  }
}

export default SystemController;
