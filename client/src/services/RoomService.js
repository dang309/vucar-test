import Cookies from "js-cookie";

import request from "src/utils/request";

class RoomService {
  static getOne(id) {
    return request
      .get(`/${Cookies.get("__LARCHIVEUM__COOKIES") ? "auth/" : ""}rooms/${id}`)
      .then(res => res.data.data);
  }
  static create(data) {
    return request.post("/auth/rooms", data).then(res => res.data.data);
  }
  static update(id, data) {
    return request.put(`/auth/rooms/${id}`, data).then(res => res.data.data);
  }

  static open(id) {
    return request.patch(`/auth/rooms/${id}/open`).then(res => res.data.data);
  }

  static close(id) {
    return request.patch(`/auth/rooms/${id}/close`).then(res => res.data.data);
  }

  static togglePublic(id) {
    return request
      .patch(`/auth/rooms/${id}/toggle-public`)
      .then(res => res.data.data);
  }

  static delete(id) {
    return request.delete(`/auth/rooms/${id}`).then(res => res.data.data);
  }
}

export default RoomService;
