import request from "src/utils/request";

class SystemAPI {
  static endPoint = "/system";

  static async getAll(params) {
    return request.get(SystemAPI.endPoint, { params });
  }

  static async getOne(id) {
    return request.get(`${SystemAPI.endPoint}/${id}`);
  }

  static async create(body) {
    return request.post(SystemAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${SystemAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${SystemAPI.endPoint}/${id}`);
  }

  static async deleteMany(ids) {
    return request.delete(`${SystemAPI.endPoint}`, { data: { ids } });
  }
}

export default SystemAPI;
