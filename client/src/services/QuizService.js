import request from "src/utils/request";

class QuizService {
  static getOne(id) {
    return request.get(`/quizzes/${id}`).then(res => res.data.data);
  }
  static create(data) {
    return request.post("/auth/quizzes", data).then(res => res.data.data);
  }
  static update(id, data) {
    return request.put(`/auth/quizzes/${id}`, data).then(res => res.data.data);
  }
  static delete(id) {
    return request.delete(`/auth/quizzes/${id}`).then(res => res.data.data);
  }
}

export default QuizService;
