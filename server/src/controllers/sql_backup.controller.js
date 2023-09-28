import SqlBackupManager from "../managers/sql_backup.manager.js";
import BaseController from "./base.controller.js";

const sqlBackupManager = new SqlBackupManager();

class SqlBackupController extends BaseController {
  constructor() {
    super(sqlBackupManager);
    this.sqlBackupManager = sqlBackupManager;
  }

  async download(req, res) {
    const { name } = req.query;
    const filePath = `${global.INFO.BACKUP_PATH}/${name}.sql`;
    const fileName = `${name}.sql`;

    res.download(filePath, fileName);
  }
}

export default SqlBackupController;
