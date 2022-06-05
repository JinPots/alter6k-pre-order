const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    phone: String,
    productid: String,
    retardCheck: Boolean
})

module.exports = mongoose.model('order', schema)