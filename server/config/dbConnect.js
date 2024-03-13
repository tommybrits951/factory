const mongoose = require("mongoose")


function dbConnect() {
    mongoose.connect("mongodb://localhost:27017/factory")
}
module.exports = dbConnect