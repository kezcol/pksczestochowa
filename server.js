var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://sa:godmode@ds056549.mlab.com:56549/pksczestochowadb');

var BusStop	= require('./app/models/busstop');

var router = express.Router();

router.use(function(req, res, next) {
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Rest API v1' });	
});

router.route('/stops')

	.get(function(req, res) {
		BusStop.find().sort().distinct('przystanek', function(err, stops) {
			if (err)
				res.send(err);
			res.json(stops);
		});
	});



app.use('/api', router);

app.listen(port);
console.log('Api no port: ' + port);
