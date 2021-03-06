var video;
let data;
let counter = 0;
var request = new XMLHttpRequest();
request.open('GET', '/data.csv', true);


fetch('http://example.com/movies.json')
  .then(function(response) {
      console.log(response.json);
      
    return response.json();
  })
  .catch(error => console.error(error));
//   .then(function(myJson) {
//     console.log(myJson);
//   });

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;

        data = parseData(resp);
        shuffleArray(data);

        let startVideo = data[0];

        video = {
            name: startVideo[0],
            id: startVideo[1]
        }

    } else {
        // We reached our target server, but it returned an error
        console.log('did not get data');
    }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log("Couldn't load csv");
};

request.send();

function parseData(data) {
    let parsedData = [];

    data.trim();
    var allRows = data.split(/\r?\n|\r/);
    allRows.shift();
    allRows.splice(-1,1);

    allRows.forEach( function(row, i) {
        var rowCells = row.split(';');
        rowCells.splice(-1,1);
        parsedData.push(rowCells);
    });

    parseData = shuffleArray(parseData);

    return parsedData;
}

function getRandomID(data) {
    let randomItem = data[Math.floor(Math.random() * data.length)];

    return randomItem;
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {

player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: 'NxUTashBrAY',
    playerVars: {
        modestbranding: true,
        autoplay: 1,
        rel: 0,
        modestbranding: true,
        autohide: 1,
        showinfo: 0,
        controls: 0,
        playsinline: 1,
        fs: 0,
        iv_load_policy: 3
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
});
}



  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
      event.target.a.classList.add('luminanceToAlpha');
      player.loadVideoById({videoId: data[counter][1]});
      event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.ENDED) {

        if (counter < data.length - 1) {
            counter++;
        } else {
            counter = 0;
        }

        var newVideo = data[counter];

        player.loadVideoById({videoId: newVideo[1]});
    }
  }

  function stopVideo() {
    player.stopVideo();
  }
