import _ from "lodash";

import REST from "../utils/rest.js";
import { ServerManager } from "../managers/index.js";

class ServerController {
  constructor() {
    this.serverManager = new ServerManager();

    this.getInformation = this.getInformation.bind(this);
  }

  async getInformation(req, res) {
    const result = await this.serverManager.getInformation();

    return REST.getSuccess(res, result);
  }
}

export default ServerController;
