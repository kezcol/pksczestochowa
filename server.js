var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://ios:godmode@ds056549.mlab.com:56549/pksczestochowadb');

var Mainbase	= require('./app/models/mainbase');
var Contact     = require('./app/models/contact');

var router = express.Router();

router.use(function(req, res, next) {
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Rest API v1' });	
});

router.route('/contacts')

	.post(function(req, res) {
		
		var contact = new Contact();
		contact.name = req.body.name;
		contact.surname = req.body.surname;
		contact.age = req.body.age;

		contact.save(function(err) {
			if (err)
				res.send({success: false});

			res.json({success: true});
		});

		
	})

	.get(function(req, res) {
		Contact.find(function(err, contacts) {
			if (err)
				res.send(err);

			res.json(contacts);
		});
	});

router.route('/stops')

	.get(function(req, res) {
		Mainbase.find(function(err, stops) {
			if (err)
				res.send(err);
			res.json(stops);
		});
	});



app.use('/api', router);

app.listen(port);
console.log('Api no port: ' + port);
