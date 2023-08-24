const mongoose = require("mongoose");

const SubscriptionSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    description_in_item: {
        type: Number,
        default: 0
    },
    clientid: {
        type: String
    },
    date: {
        type: Date
    },
    terms: {
        type: String
    },
    currency: {
        type: String
    },
    tax_id: {
        type: Number,
        default: 0
    },
    stripe_tax_id: {
        type: String
    },
    tax_id_2: {
        type: Number,
        default: 0
    },
    stripe_tax_id_2: {
        type: String
    },
    stripe_plan_id: {
        type: String
    },
    stripe_subscription_id: {
        type: String
    },
    next_billing_cycle: {
        type: Number
    },
    ends_at: {
        type: Number
    },
    status: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    project_id: {
        type: String
    },
    hash: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    created_from: {
        type: Number
    },
    date_subscribed: {
        type: Date,
        default: Date.now
    },
    in_test_environment: {
        type: Number
    },
    last_notified: {
        type: Date
    }
})

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
