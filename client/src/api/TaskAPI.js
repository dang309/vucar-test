import request from "src/utils/request";

class TaskAPI {
  static endPoint = "/tasks";

  static async getAll() {
    return request.get(TaskAPI.endPoint);
  }

  static async create(body) {
    return request.post(TaskAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${TaskAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${TaskAPI.endPoint}/${id}`);
  }
}

export default TaskAPI;
