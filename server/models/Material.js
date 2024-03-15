const mongoose = require("mongoose")

const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    locations: [{
       location: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    lot: {
        type: String,
        required: true
       },
       rec_date: {
        type: Date,
        default: new Date()
       }
    }],
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    }
})


module.exports = mongoose.model("Material", materialSchema)