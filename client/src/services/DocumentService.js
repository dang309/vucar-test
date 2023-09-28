import request from "src/utils/request";

class DocumentService {
  static getOne(id) {
    return request.get(`/documents/${id}`).then(res => res.data.data);
  }
  static create(data) {
    return request.post("/auth/documents", data).then(res => res.data.data);
  }
  static update(id, data) {
    return request
      .put(`/auth/documents/${id}`, data)
      .then(res => res.data.data);
  }
  static delete(id) {
    return request.delete(`/auth/documents/${id}`).then(res => res.data.data);
  }
}

export default DocumentService;
