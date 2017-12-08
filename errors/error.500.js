module.exports = class extends require('./app.error') {
  constructor (fields) {
    super(fields || 'Internal Server Error', 500);
  }
};
