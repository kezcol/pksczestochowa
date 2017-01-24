var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarSchema   = new Schema({
	brand: String,
	mark: String,
	price: Number
});

module.exports = mongoose.model('Car', CarSchema);