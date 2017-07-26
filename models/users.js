var mongoose = require('mongoose');

// users schema
var userSchema = mongoose.Schema({
	fatherName: {
		type: String
	},
	name: {
		type: String
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

var Users = module.exports = mongoose.model('Users', userSchema);

//get users
module.exports.getUsers = function(callback, limit){
	Users.find(callback).limit(limit);
};

//User by ID
module.exports.getUserById = function(id, callback){
	Users.findById(id, callback);
};

//Add User
module.exports.addUser = function(user, callback){
	Users.create(user, callback);
};

//Update User
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id: id};
	var update = {
		name: user.name
	};
	Users.findOneAndUpdate(query, update, options, callback);
};

//Delete User
module.exports.deleteUser = function(id, callback){
	var query = {_id: id};
	Users.remove(query, callback);
}