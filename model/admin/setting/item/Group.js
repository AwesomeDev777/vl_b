const mongoose = require("mongoose");

const itemGroupSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    commodity_group_code: {
        type: String
    },
    order: {
        type: Number
    },
    display: {
        type: Boolean,
        default: true
    },
    note: {
        type: String
    }
})

const ItemGroup = mongoose.model("ItemGroup", itemGroupSchema);

module.exports = ItemGroup;
