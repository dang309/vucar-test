import request from "src/utils/request";

class AuthService {
  static checkToken(token) {
    return request({
      method: "POST",
      url: "/check-token",
      data: {
        token
      }
    });
  }

  static verify(email, token) {
    return request({
      method: "POST",
      url: "/verify",
      data: {
        email,
        token
      }
    });
  }

  static register(username, email, password) {
    return request({
      method: "POST",
      url: `/register`,
      data: {
        username,
        email,
        password
      }
    });
  }

  static login(email, password) {
    return request({
      method: "POST",
      url: `/login`,
      data: {
        email,
        password
      }
    });
  }

  static requestResetPassword(email) {
    return request({
      method: "POST",
      url: `/request-reset-password`,
      data: { email }
    });
  }

  static resetPassword(token, password) {
    return request({
      method: "POST",
      url: `/reset-password`,
      data: {
        token,
        password
      }
    });
  }

  static reSendVerifyMail(email) {
    return request.post("/resend-email-verification", { email });
  }
}

export default AuthService;
