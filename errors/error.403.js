module.exports = class extends require('./app.error') {
  constructor (fields) {
    super(fields || 'Forbidden', 403);
  }
};
