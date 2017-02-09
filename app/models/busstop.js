var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BusStopSchema   = new Schema({
    przystanek : String,
    numer : Number,
    godzina_prz : String,
    godzina_odj : String,
    linia : Number,
    kierunek : String,
    ozn1 : String,
    ozn2 : String,
    ozn3 : String,
    ozn4 : String,
    km : Number
});

module.exports = mongoose.model('BusStop', BusStopSchema);