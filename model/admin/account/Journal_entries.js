const mongoose = require("mongoose");

const journalentriesSchema = mongoose.Schema({
    number : {
        type: String
    },
    journal_date : {
        type: Date
    },
    amount : {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    addedfrom: {
        type: Number,
        default: 0
    }
})

const Journal_entries = mongoose.model("Journal_entries", journalentriesSchema);

module.exports = Journal_entries;
