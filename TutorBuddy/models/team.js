//these are the models if we were to use if we had database conneccted to our work
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    role: String,
    bio: String,
    image: String
});

const Team = mongoose.model('Team', teamSchema);

module.exports = mongoose.model('Team', teamSchema);