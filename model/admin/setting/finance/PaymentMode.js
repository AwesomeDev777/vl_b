const mongoose = require("mongoose");

const paymentmodeSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String
    },
    show_on_pdf : {
        type: Boolean,
        default: false,
        required: true,
    },
    invoices_only : {
        type: Boolean,
        default: false,
        required: true,
    },
    expenses_only : {
        type: Boolean,
        default: false,
        required: true,
    },
    selected_by_default : {
        type: Boolean,
        default: true,
        required: true,
    },
    active : {
        type: Boolean,
        default: true,
        required: true,
    },
    
})

const PaymentMode = mongoose.model("PaymentMode", paymentmodeSchema);

module.exports = PaymentMode;
