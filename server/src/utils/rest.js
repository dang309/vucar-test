import HTTP_STATUS from "http-status";

class REST {
  static sendSuccess(res, httpStatus, { data }) {
    if (!res) {
      return;
    }

    res.status(httpStatus);
    res.contentType("json");

    return res.json({ data });
  }

  static getSuccess(res, { data }) {
    return this.sendSuccess(res, HTTP_STATUS.OK, { data });
  }

  static postSuccess(res, { data }) {
    return this.sendSuccess(res, HTTP_STATUS.CREATED, { data });
  }

  static putSuccess(res, { data }) {
    return this.sendSuccess(res, HTTP_STATUS.OK, { data });
  }

  static deleteSuccess(res, { data }) {
    return this.sendSuccess(res, HTTP_STATUS.OK, { data });
  }
}

export default REST;
