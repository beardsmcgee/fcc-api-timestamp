var express = require('express');
var Moment = require('moment');
Moment.locale('en');

var app = express();

var port = process.env.PORT || 8000;

app.get('/', function(req, res){
	res.send("Timestamp API");
});

app.get('/:time', function(req, res){
	//tests whether time is a unix time stamp or natural language
	//date.  It then converts to a unix time stamp and natual date 
	//and returns as JSON.  If time is neither a unix time stamp
	//or a natural language date, null is returned for both instead.
	var unix = null;
	var natural = null;
	var now = decodeURI(req.params.time);
	if(Moment.unix(now).isValid()){
		unix = now;
		natural = Moment.unix(now).format('MMMM D, YYYY');
	} else if(Moment(now).isValid()){
		unix = Moment(now).unix();
		natural = Moment(now).format('MMMM D, YYYY');
	}

	res.json({unix : unix, natural : natural});
});

app.listen(port);