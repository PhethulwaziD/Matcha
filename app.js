const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use('/styles', express.static('styles'));

app.use(express.static(__dirname + '/utilities'));

app.use(express.urlencoded({ extended: false }));
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

//Verify page
app.use('/verify', require('./routes/verify'));

//Verification page
app.use('/verified', require('./routes/verified'));

//Forgot password
app.use('/password', require('./routes/password'));

app.use('/reset', require('./routes/reset'))

//Listening to server
app.listen(5000, () => console.log("Listening to server"));