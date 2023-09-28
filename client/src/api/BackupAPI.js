import request from "src/utils/request";

class BackupAPI {
  static endPoint = "/sql-backup";

  static async download(name) {
    return request.get(BackupAPI.endPoint + "/download", {
      params: { name },
      responseType: "blob",
    });
  }

  static async create(body) {
    return request.post(BackupAPI.endPoint, body);
  }

  static async update(id, body) {
    return request.patch(`${BackupAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${BackupAPI.endPoint}/${id}`);
  }
}

export default BackupAPI;
