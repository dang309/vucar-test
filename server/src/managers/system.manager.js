import { System } from "../models/index.js";
import BaseManager from "./base.manager.js";

class SystemManager extends BaseManager {
  constructor() {
    super(System);
  }
}

export default SystemManager;
