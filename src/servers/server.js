//REST API DEMO in Node.js

var express = require('express');
var cors = require('cors');
var app = express();
var fs = require('fs');

//Endpoint to Get a list of users
app.use(cors());

app.get('/getWords', function (req, res) {
	fs.readFile('src/data/vocabulary.json', 'utf8', function (err, data) {
		res.end(data);
	});
});

//Create a server to listen at port 8080

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('REST API demo app listening at http://', host, port);
});
