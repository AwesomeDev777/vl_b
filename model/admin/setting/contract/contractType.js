const mongoose = require("mongoose");

const contractTypeSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    }
})

const ContractType = mongoose.model("ContractType", contractTypeSchema);

module.exports = ContractType;
