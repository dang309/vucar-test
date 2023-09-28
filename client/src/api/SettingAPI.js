import request from "src/utils/request";

class SettingAPI {
  static endPoint = "/settings";

  static async getOne(id) {
    return request.get(`${SettingAPI.endPoint}/${id}`);
  }

  static async create(body) {
    return request.post(SettingAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${SettingAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${SettingAPI.endPoint}/${id}`);
  }
}

export default SettingAPI;
