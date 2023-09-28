import { SqlBackup } from "../models/index.js";
import BaseManager from "./base.manager.js";

class SqlBackupManager extends BaseManager {
  constructor() {
    super(SqlBackup);
  }
}

export default SqlBackupManager;
