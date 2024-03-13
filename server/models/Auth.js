const mongoose = require("mongoose");



const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Auth", authSchema)