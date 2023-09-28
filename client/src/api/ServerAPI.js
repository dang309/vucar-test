import request from "src/utils/request";

class ServerAPI {
  static endPoint = "/server";

  static async getInformation() {
    return request.get(`${ServerAPI.endPoint}/information`);
  }
}

export default ServerAPI;
