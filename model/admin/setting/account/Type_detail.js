const mongoose = require("mongoose");

const typedetailSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account_Type',
        required: true
    },
    note : {
        type : String
    },
    statement_of_cash_flows : {
        type : String
    }
})

const Account_Type_Detail = mongoose.model("Account_Type_Detail", typedetailSchema);

module.exports = Account_Type_Detail;
