module.exports = class extends require('./app.error') {
  constructor (fields) {
    super(fields || 'Bad Request', 400);
  }
};
