const mongoose = require('mongoose');

//Decalre a new schema for MongoDB
const codeSchema = new mongoose.Schema({
    code: String,
    used: Boolean
})

module.exports = mongoose.model("Code", codeSchema);


