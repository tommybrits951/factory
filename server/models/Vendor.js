const mongoose = require("mongoose")


const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true 
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        default: "California"
    },
    postal: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    product: {
        type: String,
        default: "Material"
    },
    date_added: {
        type: Date,
        default: new Date()
    } 
})

module.exports = mongoose.model("Vendor", vendorSchema)