//these are the models if we were to use if we had database conneccted to our work
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  image: String
});

module.exports = mongoose.model('Event', eventSchema);