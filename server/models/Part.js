const mongoose = require("mongoose")

const partSchema = new mongoose.Schema({
    sku: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cavities: {
        type: Number,
        required: true
    },
    cycle_time: {
        type: Number,
        required: true
    },
    materials: [{
        type: String,
        required: true
    }],
    weight: {
        type: Number,
        required: true
    },
    description: String,
    date_added: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Part", partSchema)