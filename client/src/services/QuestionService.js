import request from "src/utils/request";

class QuestionService {
  static getAll(params) {
    return request.get("/questions", { params }).then(res => res.data.data);
  }
  static create(data) {
    return request.post("/auth/questions", data).then(res => res.data.data);
  }
  static update(id, data) {
    return request
      .put(`/auth/questions/${id}`, data)
      .then(res => res.data.data);
  }
  static delete(id) {
    return request.delete(`/auth/questions/${id}`).then(res => res.data.data);
  }
}

export default QuestionService;
