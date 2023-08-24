const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required: true
    },
    imap_username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    email_from_header: {
        type: Number,
        default: 0
    },
    host: {
        type: String
    },
    password: {
        type: String
    },
    encryption: {
        type: String
    },
    folder: {
        type: String,
        default: 'INBOX',
        required: true
    },
    delete_after_import: {
        type: Number,
        default: 0
    },
    calendar_id: {
        type: String
    },
    hide_from_client: {
        type: Number,
        default: 0
    }
})

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
