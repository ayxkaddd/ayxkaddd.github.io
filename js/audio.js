let player
var vid_ids = [
  "8DcdtmUJLzQ",
  "cReuQk0pJbI",
  "rLiyFaLs8PY",
  "uy63_w8gDGQ",
  "o0ndkiL5ivU",
  "bSgDauqnufI",
  "O6Si3dKB4Co",
  "z0SnviQNHxc",
  "cuUZxCQXFa8",
  "IpiN-RduTUk",
  "8jIlX94jBzo",
  "nLJV45bLlEc",
  "_C9-Yt2bI78",
  "QX_GQvxqf4M",
  "2KkMyDSrBVI",
  "9-DQyw_6KFg",
  "CMrcYUxBAxc",
  "ZN5wLvJeb7Y",
  "k2PUV3KwIgY",
  "JEVohob5Wxg",
  "YbMrRegZ3H0",
  "oGPA9k86UcE",
  "OWtpoVmry2Q",
  "7CiT-Eq1ql8",
  "4bQrqmKCREk",
  "ThWF9TzG1GU",
  "0gBx5IFLLLI",
  "h741KCQsWv4",
  "fe_RaIPp8fE",
  "tqpeQ_Gk5_w",
  "RFcTac1ZUxY",
  "TxE9EIrKbOg",
  "xSV3M3lFv58",
  "OKV0M2lEm-s",
  "-1ibgyEwgFo",
  "_Vk_tFoi9PM",
  "TOYOhGsaHA0",
  "4Xo6hGLZfCo",
  "KTHR7eoUuLY",
  "LHOiDImdRl8",
  "kjFC7RBV-N4",
  "GJEuUrTJ83k",
  "I1MIJ3b3DBQ",
  "xN-tvjnA3rA",
  "wdSrJpwJ7Ls",
  "IWbPl1D9C2Y",
  "JiwpG284QPk",
  "94hC5tTK3Es",
  "GaWsgE2mCik",
  "0nKgqxDH7e4",
  "5rj_j5ZqT00",
  "Fzt2c3IWkhQ",
  "Zw-A3Phv3zQ",
  "7mUpFmjc3eM",
  "af1r2LpI1rI",
  "k9SHS-XbFbY",
  "drQg7YjHqrs",
  "uK0JJRXGssc",
  "C9BW2UuwuVw",
  "9ZnMrrUNnJ8",
  "rjC9s-UKBTQ",
  "f3obrUOiKH0",
  "kNk-9t6tRug",
  "a-AB9R5YKZo",
  "66eiQkMLC2Q",
  "_QV12_KGpQ0",
  "IjsapjhXmvw",
  "2CdAd2eTVNY",
  "yMhv69vlSZs",
  "xFIldh3WKRU",
]

var YT;

function onYouTubeIframeAPIReady() {
  const randvid = vid_ids[Math.floor(Math.random() * vid_ids.length)]
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: randvid,
    playerVars: {
      autoplay: 1,
      fs: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}

function onPlayerReady(event) {
  event.target.playVideo()
  window.updateSongTitle()
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (player && player.getVideoData) {
        document.title = player.getVideoData().title
      }
    } else {
      document.title = "x"
    }
  })
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    Next()
  } else if (event.data == YT.PlayerState.PLAYING) {
    window.updateSongTitle()
  }
}

window.updateSongTitle = function updateSongTitle() {
  if (player && player.getVideoData && document.getElementById("songtitle")) {
    try {
      const videoData = player.getVideoData()
      if (videoData && videoData.video_id && videoData.title) {
        document.getElementById("songtitle").innerHTML =
          '<a title="Lets all love Lain" href="https://www.youtube.com/watch?v=' +
          videoData.video_id +
          '" target="_blank">' +
          videoData.title +
          "</a>"
      }
    } catch (e) {
      console.log("Error updating song title:", e)
    }
  }
}

function Next() {
  if (player && player.getVideoData) {
    const randvid = vid_ids[Math.floor(Math.random() * vid_ids.length)]
    player.loadVideoById(randvid)
    setTimeout(() => {
      window.updateSongTitle()
    }, 1000)
  } else {
    console.error("Player or getVideoData method not available")
  }
}

function toggleMute() {
  if (player) {
    if (player.isMuted()) {
      player.unMute()
      document.getElementById("muteBtn").innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      `
    } else {
      player.mute()
      document.getElementById("muteBtn").innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      `
    }
  }
}

function playNext() {
  Next()
}
