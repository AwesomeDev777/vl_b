const mongoose = require("mongoose");

const currency = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    symbol : {
        type: String,
        required: true,
        unique: true,
    },
    decimal_separator : {
        type: String
    },
    thousand_separator : {
        type: String
    },
    placement : {
        type: String
    },
    isdefault : {
        type: Boolean,
        default: false
    }
})

const Currency = mongoose.model("Currency", currency);

module.exports = Currency;
