const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
    transfer_funds_from : {
        type: String,
        required: true
    },
    transfer_funds_to : {
        type: String,
        required: true
    },
    transfer_amount : {
        type: Number    
    },
    date: {
        type: Date
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    addedfrom: {
        type: Number,
        default: 0
    }
})

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
