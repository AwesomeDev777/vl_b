const mongoose = require("mongoose");

const ContractSchema = mongoose.Schema({
    content: {
        type: String
    },
    description: {
        type: String
    },
    subject: {
        type: String
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    datestart: {
        type: Date
    },
    dateend: {
        type: Date
    },
    contract_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContractType'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    // addedfrom: {
    //     type: Number,
    //     default: 0
    // },
    // dateadded: {
    //     type: Date,
    //     default: Date.now
    // },
    created_at: {
        type: Date,
        default: Date.now
    },
    // isexpirynotified: {
    //     type: Number,
    //     default: 0
    // },
    contract_value: {
        type: Number
    },
    trash: {
        type: Boolean,
        default:false
    },
    not_visible_to_client: {
        type: Boolean,
        default: false
    },
    hash: {
        type: String
    },
    // signed: {
    //     type: Number,
    //     default: 0
    // },
    signature: {
        type: String
    },
    // marked_as_signed: {
    //     type: Number,
    //     default: 0
    // },
    acceptance_firstname: {
        type: String
    },
    acceptance_lastname: {
        type: String
    },
    acceptance_email: {
        type: String
    },
    acceptance_date: {
        type: Date
    },
    acceptance_ip: {
        type: String
    },
    short_link: {
        type: String
    }
})

const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;
