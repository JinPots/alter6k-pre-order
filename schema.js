const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    address: String,
    productid: String
})

module.exports = mongoose.model('order', schema)