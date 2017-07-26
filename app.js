var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Users = require('./models/users');
BioData = require('./models/bio');
Morecow = require('./models/morecows');

//Connect with Mongoose
// mongoose.connect('mongodb://127.0.0.1:27017/nodeapi', {useMongoClient: true});
var db = mongoose.connection.openUri('mongodb://localhost/nodeapi');

db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', () => {console.log('We are connected with MongoDB')});

app.get('/', function(req, res) {
	res.send('Please use /users or users/id, Kiddy Boy');
});


app.use(bodyParser.json());
app.get('/api/users', function(req, res) {
	Users.getUsers(function(err, more){
		if(err){
			throw err;
		}
		res.json(more);
	});
});

app.get('/api/users/:_id', function(req, res) {
	Users.getUserById(req.params._id, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', function(req, res) {
	var user = req.body;
	Users.addUser(user, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.put('/api/users/:_id', function(req, res) {
	var id = req.params._id;
	var user = req.body;
	Users.updateUser( id, user, {}, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/users/:_id', function(req, res) {
	var id = req.params._id;
	Users.deleteUser( id, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.listen(3000);
console.log('running on port 3000');