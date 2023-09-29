import request from "src/utils/request";

class CarAPI {
  static endPoint = "/cars";

  static async getAll(params) {
    return request.get(`${CarAPI.endPoint}`, { params: params });
  }

  static async getOne(id) {
    return request.get(`${CarAPI.endPoint}/${id}`);
  }

  static async update(id, body) {
    return request.patch(`${CarAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${CarAPI.endPoint}/${id}`);
  }

  static async deleteMany(ids) {
    return request.delete(`${CarAPI.endPoint}`, { data: { ids } });
  }
}

export default CarAPI;
