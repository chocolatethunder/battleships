var hostGameBtn = document.getElementById('hostGameBtn');
var rooms = document.getElementById('rooms');
var searchPlayerBtn = document.getElementById('searchPlayerBtn');
var playerToSearchFor = document.getElementById('playerToSearchFor');
//var joinGameButtons = [];
var searchResultModal = document.getElementById('searchResultModal');
var span = document.getElementsByClassName("close")[0];
var searchResults = document.getElementById('searchResults');

searchPlayerBtn.addEventListener('click', function(){
  console.log("searching for player:" + playerToSearchFor.value);
  io.socket.get('/users/searchUser', {playerToFind: playerToSearchFor.value})

});

span.onclick = function() {
  searchResultModal.style.display = "none";
};

window.onclick = function(event) {
  console.log("window was clicked");
  if (event.target === searchResultModal) {
    console.log("player clicked on somewhere and should be closed")
    searchResultModal.style.display = "none";
  }

  // here display the users found
};

io.socket.on('noPlayerFound', function(){
  alert("No Player Found");
});


io.socket.on('addRoomToView', function(data){
  console.log('addRoomToView called');
  rooms.innerHTML += '<div class="availableGames"> <strong>' + data.roomName + '</strong> ' +
    '<button class="button btn-default joinRoom" id="joinBtn' + data.roomName +'">Join</button> ' +
    '<button class="button btn-default spectateRoom" id="spectateBtn">Spectate</button> ' +
    '<p id="gameNameHostname">' + 'Game host:' + data.host + '</p> ' +
    '</div>';

});


io.socket.on('takePlayerToWaitingRoom', function(){
 // alert("take player to waiting room");
  $("body").load('awaitingPlayer');
});


hostGameBtn.addEventListener('click', function(){
  console.log('asked to host game');
  io.socket.get('/game/createGameRoom', function gotResponse(data, jwRes){
    console.log("server responded to createGameRoom");
  })
});


// Get the element, add a click listener...
rooms.addEventListener("click", function(e) {
  // e.target is the clicked element!
  // If it was a list item
  console.log("room was clicked");
  console.log("e.target:"+ e.target);
  console.log("e.target.nodeName:" + e.target.nodeName);
  console.log("e.target.className:" + e.target.className.split(" ")[0]);
  buttonClassName = e.target.className.split(" ")[2];
  // handles a click on a joimGame Button
  if (e.target && e.target.nodeName == "BUTTON" && buttonClassName == "joinRoom") {
    // List item found!  Output the ID!
    console.log("Button ", e.target.id.replace("post-", ""), " was clicked!");
    //window.location = "www.example.com"
    //$("body").load('gameMatchRoom');
    gameRoom = e.target.id;
    gameRoom = gameRoom.split("joinBtnroom")[1];
    console.log('requesting to join game Room:'+ gameRoom);
    io.socket.post('/game/joinGameRoom', {roomRequested: gameRoom})
    //$("body").load('gameMatchRoom');
  }

  // handles when a spectate room button is clicked
  if (e.target && e.target.nodeName == "BUTTON" && buttonClassName == "spectateRoom") {
    // List item found!  Output the ID!
    console.log("Button ", e.target.id.replace("post-", ""), " was clicked!");
    //window.location = "www.example.com"
    //$("body").load('gameMatchRoom');
  }

  $(e.target.id.replace("post-", "")).ready(function(){
      $("#div1").load("www.google.ca");
  });

})

io.socket.on('startGame', function(data){
  //console.log('about to add this user to this room:' + data.user);
  //window.location = "gameMatchRoom";
  alert("starting game");
});

io.socket.on('errorAlert', function(data){
  alert(data.message);
})

io.socket.on('addToSpectatorRoom', function(data){

})


