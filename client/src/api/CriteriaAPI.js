import request from "src/utils/request";

class CriterionAPI {
  static endPoint = "/criteria";

  static async getAll(params) {
    return request.get(CriterionAPI.endPoint, { params });
  }

  static async getOne(id) {
    return request.get(`${CriterionAPI.endPoint}/${id}`);
  }

  static async create(body) {
    return request.post(CriterionAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${CriterionAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${CriterionAPI.endPoint}/${id}`);
  }
}

export default CriterionAPI;
