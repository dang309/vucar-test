import request from "../utils/request";

class AnswerService {
  static getAll(params) {
    return request
      .get("/answers", {
        params
      })
      .then(res => res.data.data);
  }
  static create(data) {
    return request.post("/answers", data).then(res => res.data.data);
  }
  static update(id, data) {
    return request.put(`/answers/${id}`, data).then(res => res.data.data);
  }
  static delete(id) {
    return request.delete(`/answers/${id}`).then(res => res.data.data);
  }
}

export default AnswerService;
