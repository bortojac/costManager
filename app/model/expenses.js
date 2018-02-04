//import dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new instance of the mongoose schema.
// the schema takes an obj that shows the shape of your database entries

const expenseSchema = new Schema ({
    date: Date,
    year: Number,
    month: Number,
    day: Number,
    category: String,
    amount: Number,
    notes: String
})

module.exports = mongoose.model('Expense', expenseSchema);