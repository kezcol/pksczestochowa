var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
	name: String,
	surname: String,
	age: Number
});

module.exports = mongoose.model('Contact', ContactSchema);