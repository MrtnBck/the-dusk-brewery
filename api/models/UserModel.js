//Read the comments in CodeModel.js

const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    username: String
})

module.exports = mongoose.model('User', userSchema);