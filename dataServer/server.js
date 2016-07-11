var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var todo = require('./routes/todo');

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/todo', todo);

app.listen(5100, function() {
	console.log('server is running at http://localhost:5100');
})