
var mongoClient = require('mongodb').MongoClient,
	bcrypt = require('bcrypt');

exports.index = function(req, res){
	res.render("index");
}

exports.signUp = function(req, res){
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			db.close();
			res.end("error bro!!" + err);
		}

		else {
			var user = {
				username: req.body.usernameSignUp,
				pass: req.body.passwordSignUp,
				email: req.body.email,
				salt: "something"
			};

			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(user.pass, salt, function(err, hash){
					user.salt = salt;
					user.pass = hash;
					db.collection('users').insertOne(user, function(err, result){
						if(err){
							res.end("OH CRAP!!! SOME INTERNAL ERROR");
							db.close();
						}

						else {
							db.close();
							res.end("Your account has been created.");
						}
					});
				});
			});
		}
	});
}

exports.signIn = function(req, res){
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			db.close();
			res.end("Error signing in" + err);
		}

		else {
			var user = {
				username: req.body.usernameSignIn,
				password: req.body.passwordSignIn
			}
				
			var cursor = db.collection('users').find({"username": user.username});
			cursor.each(function(err, doc){
				if(err){
					res.end("Some internal error!");
					db.close();
				}
				else {
					if(doc != null){
						bcrypt.compare(user.password, doc.pass, function(err, log){
							if(log == true)
								res.end("YOUR EMAIL IS: " + doc.email);
							else
								res.end("Sorry wrong username or password");
							db.close();
						});
					}
					else {
						db.close();
					}
				}
			});
		}
	});
}