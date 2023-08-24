const mongoose = require("mongoose");

const GoodSchema = mongoose.Schema({
  vendorName: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  purchaseOrderNumber: {
    type: String,
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date
  },
  quantity: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Good = mongoose.model("Good", GoodSchema);

module.exports = Good;
