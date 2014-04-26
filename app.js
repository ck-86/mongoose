var express = require('express');
var http = require('http'),
	db = require('./db');

var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());

var UserSchema = require('./schemas/users');

app.get('/',function(req,res){
	res.send('ook');
});

app.get('/users', function(req, res){
	return UserSchema.find(function(err,users) {
		if(!err){
			return res.send(users);
		} else {
			return console.log(err);
		}
	});
});

app.post('/user', function(req,res){
	var record = new UserSchema(
		{ 	
			username: req.param('username'), 
			password: req.param('password'), 
			mobile: req.param('mobile')
		}
	);

	record.save(function(err) {
		if(err) {
			console.log(err);
			res.send(500).json({status: 'failure'})
		} else {
			res.send({status: 'success'})
		}
	});
});

app.get('/user/:mobile', function(req,res) {
	var mobile = { mobile: req.param('mobile') }
	return UserSchema.find(mobile, function(err,user){
		if(!err){
			return res.send(user);
		} else {
			return console.log(err);
		}
	});
});

app.put('/user', function(req, res){
	var updatedUser = {
		username: req.param('username'),
		password: req.param('password'),
		mobile: req.param('mobile')
	}

	var mobile = { mobile: req.param('mobile') }

	return UserSchema.update(mobile, updatedUser, function(err){
		if(!err){
			return res.send('User Updated');
		} else {
			return console.log(err);
		}
	});
});

app.delete('/user', function(req, res){
var mobile = { mobile: req.param('mobile') }
	return UserSchema.remove(mobile, function(err,user){
		if(!err){
			return res.send({ status: 'success' });
		} else {
			return console.log(err);
		}
	});
});



app.listen(3000, function(){
	console.log('Server Started');
});