var rank = document.getElementById('rank');
var numGamesPlayed = document.getElementById('numGamesPlayed');
var numGamesWon = document.getElementById('numGamesWon');
var winRate = document.getElementById('winRate');
var averageShotsTakenInWin = document.getElementById('averageShotsTakenInWin');
var usrname = document.getElementById('username');
var profile = document.getElementById('profile');


profile.addEventListener('click', function(){
  alert("user clicked on their profile");
  io.socket.get('/users/searchOwnProfile');
})


io.socket.on('playerFound', function(data){
  //alert("Player was found");
  console.log(data);
  usrname.innerHTML =  '<strong>' + data.username + '</strong>';
  numGamesPlayed.innerHTML = 'Games played: ' + data.gamesPlayed;
  numGamesWon.innerHTML = 'Games won: ' + data.gamesWon;
  var playerWinRate = data.gamesWon/data.gamesPlayed;
  winRate.innerHTML = 'Win rate:' + playerWinRate;
  averageShotsTakenInWin.innerHTML = 'Average shots taken to win: ' + data.averageShotsTakenInWins;

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
      labels: ['Wins', 'Losses'],
      datasets: [{
        label: ['red', 'blue'],
        fillColor: ["blue", "red"],
        backgroundColor: ["blue","red"],
        borderColor: ["blue", "red"],
        data: [data.gamesWon, data.gamesPlayed - data.gamesWon]
      }]
    },
    // Configuration options go here
    options: {}
  });

  searchResultModal.style.display = "block";
  //$("body").load('gameMatchRoom');

})
