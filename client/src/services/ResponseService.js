import request from "../utils/request";

class ResponseService {
  static getAll(params) {
    return request
      .get("/responses", {
        params
      })
      .then(res => res.data.data);
  }
  static create(data) {
    return request.post("/responses", data).then(res => res.data.data);
  }
  static update(id, data) {
    return request.put(`/responses/${id}`, data).then(res => res.data.data);
  }
  static delete(id) {
    return request.delete(`/responses/${id}`).then(res => res.data.data);
  }
}

export default ResponseService;
