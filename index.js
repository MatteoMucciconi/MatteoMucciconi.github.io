var express = require('express');
var app = express();
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var people = {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/app',express.static(__dirname +"/app"));

//Connect to mongo DB database
mongoose.connect("mongodb://127.0.0.1:27017/my-chat");

//Create a schema for chat
var ChatSchema = mongoose.Schema({
  	date: Date,
  	message: String,
  	user_id: String,
	username: String
});

//Create a model from the chat schema
var Chat = mongoose.model('Chat', ChatSchema)


io.on('connection', function(socket){
	socket.on('join', (name) => {
		people[socket.id] = name;
		socket.emit("update", "You have connected to the server.");
		io.sockets.emit("update", name + " has joined the server.")
		io.sockets.emit("update-people", people);
	});
	
	socket.on("send", (message) => {
		data = {user: socket.id, username: people[socket.id], message: message, date: new Date()};
		
	    var newChat = new Chat(data);
	    newChat.save();
		io.sockets.emit("chat",  data)
	});
	
	socket.on("disconnect", () => {
		io.sockets.emit("update", people[socket.id] + " has left the server.");
		delete people[socket.id];
		io.sockets.emit("update-people", people);
	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});