//these are the models if we were to use if we had database conneccted to our work
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);