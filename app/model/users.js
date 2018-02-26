//import dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose schema.
// the schema takes an obj that shows the shape of your database entries

var userSchema = new Schema ({
    userId: String,
    monthStartDay: Number,
    categories: Array
})

module.exports = mongoose.model('Users', userSchema);