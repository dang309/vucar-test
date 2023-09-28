import request from "src/utils/request";

class UserAPI {
  static endPoint = "/users";

  static async getOne(id) {
    return request.get(`${UserAPI.endPoint}/${id}`);
  }

  static async me() {
    return request.get(`${UserAPI.endPoint}/me`);
  }

  static async create(body) {
    return request.post(UserAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${UserAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${UserAPI.endPoint}/${id}`);
  }

  static async deleteMany(ids) {
    return request.delete(`${UserAPI.endPoint}`, { data: { ids } });
  }
}

export default UserAPI;
