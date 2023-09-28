import SettingManager from "../managers/setting.manager.js";
import BaseController from "./base.controller.js";

class SettingController extends BaseController {
  constructor() {
    super(new SettingManager());
  }
}

export default SettingController;
