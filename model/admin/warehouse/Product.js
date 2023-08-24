const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    unique_id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bin_location: {
        type: String,
        required: true
    },
    expiration_date: {
        type: Date
    },
    initial_stock: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    current_stock: {
        type: Number
    },
    last_withdrawal: {
        type: Number
    },
    warehouse_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
