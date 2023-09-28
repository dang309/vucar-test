import request from "src/utils/request";

class UserService {
  static getAvatar(userId) {
    return request
      .get(`/auth/users/${userId}/avatar`)
      .then(res => res.data.data);
  }
  static update(id, data) {
    return request.put(`/auth/users/${id}`, data).then(res => res.data.data);
  }
}

export default UserService;
