var hostGameBtn = document.getElementById('hostGameBtn');
var rooms = document.getElementById('rooms');
var joinGameButtons = [];


io.socket.on('addRoomToView', function(data){
  console.log('addRoomToView called');
  rooms.innerHTML += '<div class="availableGames"> <strong>' + data.roomName + '</strong> ' +
    '<button class="button btn-default" id="joinBtn' + data.roomName +'">Join</button> ' +
    '<button class="button btn-default" id="spectateBtn">Spectate</button> ' +
    '<p id="gameNameHostname">' + 'Game host:' + data.host + '</p> ' +
    '</div>';
  console.log('addRomToView done');

  var newButtonName = "joinBtn" + data.roomName;
  var joinBtn1 = document.getElementById(newButtonName);
  joinGameButtons.push(newButtonName);
  console.log('join Game buttons' + joinGameButtons[0])
  joinBtn1.addEventListener('click', function(){
    console.log('asked to jn game')
  })
});

for(var i=0; joinGameButtons.length; i++){
  button[1] = joinGameButtons[i]
  addEventListener('click',function(){
    console.log('asked to join a game');
  })
}


io.socket.on('addRoomEventListeners', function(data){
  console.log('adding event listeners');
  var newButtonName = "joinBtn" + data.roomName;
  var joinBtn1 = document.getElementById('newButtonName');
})


hostGameBtn.addEventListener('click', function(){
  console.log('asked to host game');
  io.socket.get('/game/createGameRoom', function gotResponse(data, jwRes){
    console.log("server responded to createGameRoom");
  })
});


