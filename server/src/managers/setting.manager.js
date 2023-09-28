import { Setting } from "../models/index.js";
import BaseManager from "./base.manager.js";

class SettingManager extends BaseManager {
  constructor() {
    super(Setting);
  }
}

export default SettingManager;
