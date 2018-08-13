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
