var allVideos;
var counter = 0;

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

    fetch('/data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            return shuffleArray(jsonData.features);
        })
        .then(function (shuffledArray) {
            allVideos = shuffledArray;
            var firstVideo = allVideos[counter];
            addDesc(firstVideo)
            player.loadVideoById({ videoId: firstVideo.youtubeId });
            event.target.playVideo();
        })
        .catch(function (error) {
            console.error(error);
        })
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.ENDED) {

        if (counter < allVideos.length - 1) {
            counter++;
        } else {
            counter = 0;
        }

        var newData = allVideos[counter];

        player.loadVideoById({ videoId: newData.youtubeId });
    }
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

function addDesc(data) {
    var parent = document.getElementById('desc');
    parent.setAttribute('href', 'http://youtube.com/watch?v=' + data.youtubeId);

    var artistElement = document.createElement('p');
    var artistContent = document.createTextNode(data.artist);
    var songElement = document.createElement('h3');
    var songContent = document.createTextNode(data.songName);
    
    artistElement.appendChild(artistContent);
    songElement.appendChild(songContent);
    parent.appendChild(artistElement); 
    parent.appendChild(songElement); 
}