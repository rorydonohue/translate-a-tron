var express = require("express");
var translate = require("node-google-translate");
//var https = require('https');	// for Google API
var app = express();
var port = 3700;
var key = 'AIzaSyDuBr3MZJSXOHpUghzKaj2lkXjrXrwDvKE';

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
	res.render('page');
});


var io = require('socket.io').listen(app.listen(port))

io.sockets.on('connection', function(socket) {
	socket.emit('message', { message: 'welcome to the chat' });
	socket.on('send', function(data) {


		// Send the normal text to all clients
		io.sockets.emit('message', data);
		
		translate({key: key, q: data.message, target: 'fr'}, function(result){
		  console.log(result); 
		  data.message = result[data.message];
		  io.sockets.emit('translate', data);
		});

	});

});
console.log("Listening on port " + port);