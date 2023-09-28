class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.code = statusCode;
  }
}

export default ApiError;
