let player;

function onYouTubeIframeAPIReady() {
    var vid_ids = ['H221MRRgFZs', '8DcdtmUJLzQ', 'cReuQk0pJbI', 'rLiyFaLs8PY', 'uy63_w8gDGQ', 'o0ndkiL5ivU', 'bSgDauqnufI', 'O6Si3dKB4Co', 'z0SnviQNHxc', 'cuUZxCQXFa8', 'IpiN-RduTUk', '8jIlX94jBzo', 'nLJV45bLlEc', '_C9-Yt2bI78', 'QX_GQvxqf4M', '2KkMyDSrBVI', '9-DQyw_6KFg', 'CMrcYUxBAxc']
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
    document.getElementById("songtitle").innerHTML = '<a title="Lets all love Lain" href="https://www.youtube.com/watch?v=' + player.getVideoData().video_id + '" target="_blank">' + player.getVideoData().title + '</a>';    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = player.getVideoData().title;
        } else {
            document.title = 'x';
        }
    });
}
