
var mongoClient = require('mongodb').MongoClient,
	bcrypt = require('bcrypt');

exports.index = function(req, res){
	if(req.session.user){
		res.redirect("/home");
	}
	else{
		res.render("index");
	}
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
			};

			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(user.pass, salt, function(err, hash){
					user.pass = hash;

					db.collection('users').find({"username": user.username}).count(function(err, val){
						if(val == 0){
							db.collection('users').insertOne(user, function(err, result){
								if(err){
									res.end("OH CRAP!!! SOME INTERNAL ERROR");
									db.close();
								}

								else {
									db.close();
									req.session.user = user.username; //Login the user into his/her account and set the session
									res.redirect("/home");
								}
							});
						}

						else {
							res.end("Sorry Username Already taken");
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
				
			db.collection('users').find({"username": user.username}).count(function(err, count){
				if(count == 0){
					res.end("Sorry Wrong Username or Password");
				}

				else {
					var cursor = db.collection('users').find({"username": user.username})
					cursor.each(function(err, doc){
						if(err){
							res.end("Some internal error!");
							db.close();
						}
						else {
							if(doc != null){
								bcrypt.compare(user.password, doc.pass, function(err, log){
									if(log == true){
										req.session.user = user.username; //Login the user into his/her account and set the session
										res.redirect("/home");
									}
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
	});
};

exports.home = function(req, res){
	if(req.session.user)
		res.render("home");
	else
		res.redirect("/");
};

exports.logOut = function(req, res){
	req.session.destroy();
	res.redirect("/");
}

exports.available = function(req, res){
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(req.body.check == "email"){
			db.collection("users").find({"email": req.body.email}).count(function(err, val){
				if(val == 0){
					res.end(JSON.stringify({"output": "true", "check": "email"}));
					db.close();
				}
				else {
					res.end(JSON.stringify({"output": "false", "check": "email"}));
					db.close();
				}
			});
		}
		else if(req.body.check == "username"){
			db.collection("users").find({"username": req.body.username}).count(function(err, val){
				if(val == 0){
					res.end(JSON.stringify({"output": "true", "check": "username"}));
					db.close();
				}
				else {
					res.end(JSON.stringify({"output": "false", "check": "username"}));
					db.close();
				}
			});
		}
	});
}