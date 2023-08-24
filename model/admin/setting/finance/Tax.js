const mongoose = require("mongoose");

const tax = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    taxrate : {
        type: Number,
        required: true,
        unique: true,
    }
})

const Tax = mongoose.model("Tax", tax);

module.exports = Tax;
