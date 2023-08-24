const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    company: {
        type: String
    },
    vat: {
        type: String
    },
    phonenumber: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: String
    },
    state: {
        type: String
    },
    address: {
        type: String
    },
    website: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Number,
        default: 1
    },
    // leadid: {
    //     type: Number
    // },
    billing_street: {
        type: String
    },
    billing_state: {
        type: String
    },
    billing_zip: {
        type: String
    },
    billing_country: {
        type: String
    },
    shipping_street: {
        type: String
    },
    shipping_city: {
        type: String
    },
    shipping_state: {
        type: String
    },
    shipping_zip: {
        type: String
    },
    shipping_country: {
        type: String
    },
    longitude: {
        type: String
    },
    latitude: {
        type: String
    },
    default_language: {
        type: String
    },
    default_currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Currency'
    },
    groups: [String],
    contacts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact'
        }
    ],
    fieldvalues : [
        {
            value : {
                type: String
            },
            field : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ClientField'
            }
        }
    ],
    show_primary_contact: {
        type: Number,
        default: 0
    },
    // stripe_id: {
    //     type: String
    // },
    registration_confirmed: {
        type: Number,
        default: 1
    },
    addedfrom: {
        type: Number,
        default: 0
    }
})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
