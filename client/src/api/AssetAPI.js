import request from "src/utils/request";

class AssetAPI {
  static endPoint = "/assets";

  static async getAll(params) {
    return request.get(`${AssetAPI.endPoint}`, {params: params});
  }

  static async getOne(id) {
    return request.get(`${AssetAPI.endPoint}/${id}`);
  }

  static async uploadFromComputer(formData) {
    return request.post(`${AssetAPI.endPoint}/upload/local`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async uploadByUrl(formData) {
    return request.post(`${AssetAPI.endPoint}/upload/url`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async extractFace(id, body) {
    return request.post(`${AssetAPI.endPoint}/${id}/extract-face`, body);
  }

  static async verifyFace(id, body) {
    return request.post(`${AssetAPI.endPoint}/${id}/verify-face`, body);
  }

  static async update(id, body) {
    return request.patch(`${AssetAPI.endPoint}/${id}`, body);
  }

  static async delete(id) {
    return request.delete(`${AssetAPI.endPoint}/${id}`);
  }

  static async deleteMany(ids) {
    return request.delete(`${AssetAPI.endPoint}`, { data: { ids } });
  }
}

export default AssetAPI;
