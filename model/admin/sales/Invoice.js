const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
    sent: {
        type: Boolean,
        default: false,
        required: true
    },
    datesend: {
        type: Date
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    deleted_customer_name: {
        type: String
    },
    number: {
        type: Number
    },
    number_format: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: date,
        required: true
    },
    duedate: {
        type: date,
    },
    currency: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    total_tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    adjustment: {
        type: Number
    },
    addedfrom: {
        type: Number
    },
    hash: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    clientnote: {
        type: String
    },
    adminnote: {
        type: String
    },
    last_overdue_reminder: {
        type: Date
    },
    last_due_reminder: {
        type: Date
    },
    allowed_payment_modes: {
        type: String
    },
    cancel_overdue_reminders: {
        type: Boolean,
        default: false,
        required: true
    },
    token: {
        type: String
    },
    discount_percent: {
        type: Number,
        default: 0
    },
    discount_total: {
        type: Number,
        default: 0
    },
    discount_type: {
        type: String,
        required: true
    },
    recurring: {
        type: Boolean,
        default: false,
        required: true
    },
    recurring_type: {
        type: String
    },
    custom_recurring: {
        type: Boolean,
        default: false,
        required: true
    },
    cycles: {
        type: Number,
        default: 0,
        required: true
    },
    total_cycles: {
        type: Number,
        default: 0,
        required: true
    },
    is_recurring_from: {
        type: Number
    },
    last_recurring_date: {
        type: Date
    },
    terms: {
        type: String
    },
    sale_agent: {
        type: Number,
        default: 0,
        required: true
    },
    billing_street: {
        type: String
    },
    billing_city: {
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
    include_shipping: {
        type: Boolean,
        defaut: false,
        required: true
    },
    show_shipping_on_invoice: {
        type: Boolean,
        defaut: true,
        required: true
    },
    show_quantity_as: {
        type: Number,
        default: 0,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    short_link: {
        type: String
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item'
        }
    ]
})

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
