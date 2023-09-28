import request from "src/utils/request";

class PersonAPI {
  static endPoint = "/people";

  static async getAll() {
    return request.get(`${PersonAPI.endPoint}`);
  }

  static async getOne(id) {
    return request.get(`${PersonAPI.endPoint}/${id}`);
  }

  static async create(body) {
    return request.post(PersonAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${PersonAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${PersonAPI.endPoint}/${id}`);
  }

  static async deleteMany(ids) {
    return request.delete(`${PersonAPI.endPoint}`, { data: { ids } });
  }
}

export default PersonAPI;
