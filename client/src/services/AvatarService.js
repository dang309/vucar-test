import request from "src/utils/request";

class AvatarService {
  static getAll() {
    return request.get("/auth/avatars", {}).then(res => res.data.data);
  }
}

export default AvatarService;
