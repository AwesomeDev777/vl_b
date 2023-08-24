const mongoose = require("mongoose");

const clientFieldSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    field_order : {
        type: Number
    },
    active : {
        type: Boolean,
        default: true,
        required: true
    },
})

const ClientField = mongoose.model("ClientField", clientFieldSchema);

module.exports = ClientField;
