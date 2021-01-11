const express = require('express');
																	
const session = require('express-session');

const app = express();

const cors = require('cors')

app.set('view engine', 'ejs');

app.use('/styles', express.static('styles'));

app.use(express.static(__dirname + '/utilities'));

app.use(express.urlencoded({ extended: false }));

//session registration
app.use(session({
	secret:'sessionsecret',
	resave: true,
	saveUninitialized: true
}));

//app.use(cors());

app.options('/location', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

/*
	Remember you do not need to specify the exact location
		in ejs for express.static to work
*/

					/**ROUTES**/
//Home Page
app.use('/', require('./routes/index'));

//Login Page
app.use('/signin', require('./routes/signin'));

//Registration page
app.use('/signup', require('./routes/signup'));

//Verification page
app.use('/verify', require('./routes/verify'));

//Forgot password
app.use('/password', require('./routes/password'));

app.use('/reset', require('./routes/reset'));

app.use('/profile', require('./routes/profile'));

app.use('/location', require('./routes/location'));

app.use('/createtable', require('./routes/createtable'));

//Listening to server
app.listen(5000, () => console.log("Listening to server"));