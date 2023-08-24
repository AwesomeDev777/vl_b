const mongoose = require("mongoose");

const clientGroupSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    }
})

const ClientGroup = mongoose.model("ClientGroup", clientGroupSchema);

module.exports = ClientGroup;
