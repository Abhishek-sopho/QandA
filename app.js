var express = require('express'),
	http = require('http'),
	path = require('path'),
	io = require('socket.io')
	route = require('./routes/route'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	
var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(session({secret: "mySecretCode!!"}));


app.get("/", function(req, res){
	route.index(req, res);
});

app.post("/signUp", function(req, res){
	route.signUp(req, res);
});

app.post("/signIn", function(req, res){
	route.signIn(req, res);
});

app.get("/home", function(req, res){
	route.home(req, res);
});

app.get("/logout", function(req, res){
	route.logOut(req, res);
});

app.use(express.static(__dirname + "/public"));

// This must be last one otherwise it will route any other requests
// even for static files!!
app.get("*", function(req, res){
	res.send("<h1>404: Page not found</h1>");
});

server.listen(3000, function(){
	console.log("-----------------------------------");
	console.log("Serve listening to port 3000");
	console.log("-----------------------------------");
});