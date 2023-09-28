import request from "src/utils/request";

class ModelAPI {
  static endPoint = "/models";

  static async getAll(params) {
    return request.get(ModelAPI.endPoint, { params });
  }

  static async getOne(id) {
    return request.get(`${ModelAPI.endPoint}/${id}`);
  }

  static async create(body) {
    return request.post(ModelAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${ModelAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${ModelAPI.endPoint}/${id}`);
  }
}

export default ModelAPI;
