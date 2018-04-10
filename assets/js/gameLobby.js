var hostGameBtn = document.getElementById('hostGameBtn');
var rooms = document.getElementById('rooms');


io.socket.on('addRoomToView', function(data){
  console.log('addRoomToView called');
  rooms.innerHTML += '<p>' + data.roomName + '</p>';
  console.log('addRomToView done');
});

hostGameBtn.addEventListener('click', function(){
  console.log('asked to host game');
  io.socket.get('/game/createGameRoom', function gotResponse(data, jwRes){
    console.log("server responded to createGameRoom");
  })
});


