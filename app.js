var express = require('express'),
	http = require('http'),
	path = require('path'),
	bodyParser = require('body-parser'),
	io = require('socket.io')
	route = require('./routes/route');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	route.index(req, res);
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