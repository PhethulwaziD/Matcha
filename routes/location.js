const express = require('express');

const router = express.Router();

const nodeGeocoder = require('node-geocoder');

const requestIp = require('request-ip');



router.get('/', (req, res) => {
	console.log(req.connection.remoteAddress);
	let options = {
		provider : 'openstreetmap'
	}

	let geocoder = nodeGeocoder(options);
	geocoder.reverse({lat: -26.2041028, lon:28.0473051}, function(err, res) {
		console.log(res);
	});
	res.render('location');
});


router.post('/', (req, res) => {
	let options = {
		provider : 'openstreetmap'
	}

	let geocoder = nodeGeocoder(options);
	geocoder.reverse({lat:-26.214399999999998, lon:27.9117824}, function(err, res) {
			 console.log(res);
	});
	res.render('location');
});

module.exports = router;