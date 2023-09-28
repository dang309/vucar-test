import { v4 as uuidv4 } from "uuid";
import bree from "../config/bree.js";

class SocketService {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  async monitor() {
    const uuid = uuidv4();
    return bree
      .add({
        name: uuid,
        path: `${global.INFO.JOB_PATH}monitoring.job.js`,
        interval: "10s",
      })
      .then(() => {
        bree.start(uuid);
      });
  }
}

export default SocketService;
