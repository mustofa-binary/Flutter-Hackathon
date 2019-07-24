let mongoose = require('mongoose')

let ContactSchema = new mongoose.Schema({
    name: String,
    dob: String,
    image_uri: String,
    mobile_no: String,
})

module.exports = mongoose.model('Contact', ContactSchema)