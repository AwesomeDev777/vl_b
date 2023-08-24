const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const staffSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    facebook: {
        type: String
    },
    linkedin: {
        type: String
    },
    phonenumber: {
        type: String
    },
    skype: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    profile_image: {
        type: String
    },
    last_ip: {
        type: String
    },
    last_login: {
        type: Date
    },
    last_activity: {
        type: Date
    },
    last_password_change: {
        type: Date
    },
    new_pass_key: {
        type: String
    },
    new_pass_key_requested: {
        type: Date
    },
    admin: {
        type: Number,
        default: 0
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    departments: [String],
    active: {
        type: Boolean,
        default: true
    },
    default_language: {
        type: String
    },
    direction: {
        type: String
    },
    media_path_slug: {
        type: String
    },
    is_not_staff: {
        type: Number,
        default: 0
    },
    hourly_rate: {
        type: Number,
        default: 0.0
    },
    two_factor_auth_enabled: {
        type: Number
    },
    two_factor_auth_code: {
        type: String
    },
    two_factor_auth_code_requested: {
        type: Date
    },
    email_signature: {
        type: String
    },
    google_auth_secret: {
        type: String
    }
})

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
