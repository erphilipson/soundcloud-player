let player = document.querySelector('.music-player');
let searchForm = document.querySelector('.search-form');
var results = document.querySelector('.results');
let nowPlaying = document.querySelector('.now-playing');

searchForm.onsubmit = function () {
  results.innerHTML = '';

  let searchItem = document.querySelector('.search-item').value;

  if (searchItem.indexOf(' ') >= 0) {
     searchItem = searchItem.replace(/\s+/g, '-').toLowerCase();
  }

  let apiUrl = 'http://api.soundcloud.com/tracks.json?q=' + searchItem + '&client_id=86b6a66bb2d863f5d64dd8a91cd8de94';

  fetch(apiUrl)
    .then(
      function(response) {
        if (response.status != 200) {
          alert('There was an error! ' + response.status)
          return;
        }

        response.json().then(function(data){

          for(let i=0; i<data.length; i++){
          var artwork = data[i].artwork_url;
          var artist = data[i].user.username;
          var songTitle = data[i].title;
          var song = data[i].stream_url;

          if (artwork === null){
            artwork = data[i].user.avatar_url;
          }

          let markup =
          `
            <div class='each-element'>
              <img src='${artwork}' id='${song}' class='image'></img></a>
              <p class='songTitle'>${songTitle}</p>
            </div>
          `

          results.innerHTML += markup;
          }

          document.getElementById('results').addEventListener('click', function(e){
            if (e.target && e.target.nodeName == 'IMG'){
              song = e.target.id;

              let title = (e.target.nextElementSibling.innerText);

              player.setAttribute('src', song + '?client_id=86b6a66bb2d863f5d64dd8a91cd8de94');

              nowPlaying.textContent = "Now Playing: " + title;
              return;
            }
          })
        })
      }
    )
    return false;
}
