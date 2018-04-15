
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
	
	//tell the other player which square was fired at
	socket.on('transferTorpedo', function(eid){
		socket.broadcast.emit('receiveTorpedo', eid);
	});
	
	//transfer the received board to the other player
	socket.on('transferBoard', function(playerBoard) {
		var newBoard = playerBoard;
		socket.broadcast.emit('receiveBoard', newBoard);
	});
 	
	//on disconnect - should eventually declare winner or something idk if we want a reconnect feature
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	
	//when a player sends a chat message, add server time to the start and 
	socket.on('chat', function(msg){
		var d = new Date();
		h = d.getHours().toString();
		m = d.getMinutes().toString();
		//minute length should be 2 digits ex 01
		if(m.length == 1) {
			m = '0' + m;
		}
		msg = h + ':' + m + ')' + msg;
		console.log("message: " + msg);
		socket.broadcast.emit('chat', msg);
		//users should see their own messages bolded
		socket.emit('chat', msg.bold());
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});