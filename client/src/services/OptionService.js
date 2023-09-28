import request from "src/utils/request";

class OptionService {
  static create(data) {
    return request.post("/auth/options", data).then(res => res.data.data);
  }
  static update(id, data) {
    return request.put(`/auth/options/${id}`, data).then(res => res.data.data);
  }
  static delete(id) {
    return request.delete(`/auth/options/${id}`).then(res => res.data.data);
  }
}

export default OptionService;
