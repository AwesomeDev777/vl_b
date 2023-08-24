const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    isprimary: {
        type: Boolean,
        required: false
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    new_pass_key: {
        type: String
    },
    new_pass_key_requested: {
        type: Date
    },
    email_verified_at: {
        type: Date
    },
    email_verification_key: {
        type: String
    },
    email_verification_sent_at: {
        type: Date
    },
    last_ip: {
        type: String
    },
    last_login: {
        type: Date
    },
    last_password_change: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    },
    profile_image: {
        type: String
    },
    direction: {
        type: String
    },
    invoice_emails: {
        type: Number,
        default: 0
    },
    estimate_emails: {
        type: Number,
        default: 0
    },
    contract_emails: {
        type: Number,
        default: 0
    },
    credit_note_emails: {
        type: Number,
        default: 0
    },
    project_emails: {
        type: Number,
        default: 0
    },
    ticket_emails: {
        type: Number,
        default: 0
    },
    task_emails: {
        type: Number,
        default: 0
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    // position: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Role'
    // },
})

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
