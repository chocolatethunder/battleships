
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

max_connections = 2;
current_connections = 0;

io.on('connection', function(socket){
	console.log('a user connected');
	//if a connecting user would increase the number of users we have to more than 2, disconnect them.
	if(current_connections >= max_connections) {
		socket.disconnect();
		console.log('too many users, disconnecting user');
	} else {
		//increment and decrement user count when they join or leave
		current_connections++;
		socket.on('disconnect', function() {
			current_connections--;
		});
	}
	
	socket.on('transferTorpedo', function(eid){
		socket.broadcast.emit('receiveTorpedo', eid);
	});
	
	socket.on('transferBoard', function(playerBoard) {
		var newBoard = playerBoard;
		socket.broadcast.emit('receiveBoard', newBoard);
	});
 	
	//on disconnect - should eventually declare winner or something idk if we want a reconnect feature
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});