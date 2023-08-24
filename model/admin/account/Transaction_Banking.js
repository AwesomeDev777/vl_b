const mongoose = require("mongoose");

const transactionBankSchema = mongoose.Schema({
    date : {
        type: Date,
        required: true
    },
    withdrawals : {
        type: Number,
        required: true
    },
    deposits : {
        type: Number,
        required: true
    },
    payee : {
        type: String
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

const TransactionBank = mongoose.model("TransactionBank", transactionBankSchema);

module.exports = TransactionBank;
