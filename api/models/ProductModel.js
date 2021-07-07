//Read the comments in CodeModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    productOrigin: String,
    productType: String,
    productDescription: String,
    productImg: String,
    productPrice: Number
})

module.exports = mongoose.model("Product", productSchema);