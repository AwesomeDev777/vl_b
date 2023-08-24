const mongoose = require("mongoose");

const itemFieldSchema = mongoose.Schema({
    // fieldto : {
    //     type: String
    // },
    name : {
        type: String,
        required: true
    },
    slug : {
        type: String,
        required: true
    },
    // required : {
    //     type: Boolean,
    //     default: true
    // },
    // type : {
    //     type: String,
    //     required: true
    // },
    options : {
        type: String
    },
    display_inline : {
        type: Number,
        default: 0
    },
    field_order : {
        type: Number
    },
    active : {
        type: Boolean,
        default: true
    },
    show_on_pdf : {
        type: Boolean,
        default: true
    },
    show_on_ticket_form : {
        type: Boolean,
        default: true
    },
})

const ItemField = mongoose.model("ItemField", itemFieldSchema);

module.exports = ItemField;
