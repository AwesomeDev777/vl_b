const mongoose = require("mongoose");

const expenseCategorySchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String
    }
})

const ExpenseCategory = mongoose.model("ExpenseCategory", expenseCategorySchema);

module.exports = ExpenseCategory;
