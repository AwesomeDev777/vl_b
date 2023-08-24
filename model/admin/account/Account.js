const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    keyname : {
        type: String
    },
    number : {
        type: Number    
    },
    parent_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    account_type: {
        type: String,
        required: true
    },
    account_type_detail: {
        type: String,
        required: true
    },
    balance : {
        type: Number
    },
    balance_as_of : {
        type: Date
    },
    description : {
        type: String    
    },
    default_account : {
        type: Boolean,
        default: true
    },
    active : {
        type: Boolean,
        default: true   
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
