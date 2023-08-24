const mongoose = require("mongoose");

const GoodQualitySchema = mongoose.Schema({
  goodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Good'
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const GoodQuality = mongoose.model("GoodQuality", GoodQualitySchema);

module.exports = GoodQuality;
