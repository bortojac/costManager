//import dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose schema.
var expenseSchema = new Schema ({
    date: Date,
    year: Number,
    month: Number,
    day: Number,
    category: String,
    amount: Number,
    notes: String,
    userId: String
})


module.exports = mongoose.model('Expenses', expenseSchema);