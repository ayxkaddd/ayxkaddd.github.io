let player;

function onYouTubeIframeAPIReady() {
    var vid_ids = ['H221MRRgFZs', '8DcdtmUJLzQ', 'cReuQk0pJbI', 'rLiyFaLs8PY', 'uy63_w8gDGQ', 'o0ndkiL5ivU', 'bSgDauqnufI']
    const randvid = vid_ids[Math.floor(Math.random() * vid_ids.length)];

    player = new YT.Player('player', {
      height: '0',
      width: '0',
      videoId: randvid, 
      playerVars: {
        autoplay: 1,
        fs: 0
      },
      events: {
        'onReady': onPlayerReady,
      }
    });
  }

function onPlayerReady(event) {
    event.target.playVideo();
    document.getElementById("songtitle").innerHTML = '<a title="Lest all love Lain" href="https://www.youtube.com/watch?v=' + player.getVideoData().video_id + '" target="_blank">' + player.getVideoData().title + '</a>';
}
