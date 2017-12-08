module.exports = class extends Error {
  constructor (message, status) {
    super(message || 'Internal Server Error');
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
};
