const express  = require("express");

const router = express.Router();


router.get('/', (req, res) => {
	res.render('signin.ejs', {body:{}});
});

router.post('/', (req, res)=> {
	console.log(req.body);
	res.render('signin.ejs', {body: req.body});
});

module.exports = router;