import request from "src/utils/request";

class FaceAPI {
  static endPoint = "/inspection-result";

  static async getOne(id) {
    return request.get(`${FaceAPI.endPoint}/${id}`);
  }

  static async create(body) {
    return request.post(FaceAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${FaceAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${FaceAPI.endPoint}/${id}`);
  }

  static async deleteMany(ids) {
    return request.delete(`${FaceAPI.endPoint}`, { data: { ids } });
  }
}

export default FaceAPI;
