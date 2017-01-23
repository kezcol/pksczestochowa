var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/droidRest');
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
				res.send(err);

			res.json({ message: 'Contact created!' });
		});

		
	})

	.get(function(req, res) {
		Contact.find(function(err, contacts) {
			if (err)
				res.send(err);

			res.json(contacts);
		});
	});

router.route('/contacts/:contact_id')

	.get(function(req, res) {
		Contact.findById(req.params.contact_id, function(err, contact) {
			if (err)
				res.send(err);
			res.json(contact);
		});
	})

	.put(function(req, res) {
		Contact.findById(req.params.contact_id, function(err, contact) {

			if (err)
				res.json({success: false});

			contact.name = req.body.name;
			contact.surname = req.body.surname;
			contact.age = req.body.age;

			contact.save(function(err) {
				if (err)
					res.json({success: false});

				res.json({success: true});
			});

		});
	})

	.delete(function(req, res) {
		Contact.remove({
			_id: req.params.contact_id
		}, function(err, contact) {
			if (err)
				res.json({success: false});

			res.json({success: true});
		});
	});


app.use('/api', router);

app.listen(port);
console.log('Api no port: ' + port);
