const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
})

const Account_Type = mongoose.model("Account_Type", typeSchema);

module.exports = Account_Type;
