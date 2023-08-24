const mongoose = require("mongoose");

const WarehouseSchema = mongoose.Schema({
    warehouse_code: {
        type: String,
        required: true
    },
    warehouse_name: {
        type: String,
        required: true
    },
    warehouse_address: {
        type: String
    },
    order: {
        type: Number
    },
    display: {
        type: Boolean,
        default: true
    },
    note: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip_code: {
        type: String
    },
    country: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Warehouse = mongoose.model("Warehouse", WarehouseSchema);

module.exports = Warehouse;
