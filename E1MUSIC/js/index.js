function $(selector) {
  return document.querySelector(selector);
}

var musicList = []
var currentIndex = 0;
var audio = new Audio();
audio.autoplay = true;

getMusicList(function(list) {
    musicList = list
    generateList(list)
    loadMusic(list[currentIndex]);
});

audio.ontimeupdate = function() {
  $(".progress-now").style.width =
    (this.currentTime / this.duration) * 100 + "%";
};
audio.onended = function(){
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}
audio.onplay = function() {
  clock = setInterval(function() {
    var allmin = Math.floor(audio.duration / 60);
    var allsec = Math.floor(audio.duration % 60) + "";
    allsec = allsec.length === 2 ? allsec : "0" + allsec;
    var alltime = allmin + ":" + allsec;

    var min = Math.floor(audio.currentTime / 60);
    var sec = Math.floor(audio.currentTime % 60) + ""; //后面的   + ''可以将sec转换为字符串
    sec = sec.length === 2 ? sec : "0" + sec;
    $(".time").innerText = min + ":" + sec + "/" + alltime;
  }, 1000);
};
audio.onpause = function() {
  clearInterval(clock);
};

$(".play").onclick = function() {
  if (audio.paused) {
    audio.play();
    this.querySelector(".iconfont").classList.add("icon-zanting");
    this.querySelector(".iconfont").classList.remove("icon-bofang");
  }else {
    audio.pause();
    this.querySelector(".iconfont").classList.remove("icon-zanting");
    this.querySelector(".iconfont").classList.add("icon-bofang");
  }
};


$('.back').onclick = function(){
    currentIndex = (musicList.length + --currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}


$('.forward').onclick = function(){
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}

$('.bar').onclick = function (e){
    var percent = e.offsetX/parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent; 
}
function getMusicList(callback) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "music.json", true);

  xhr.onload = function() {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      callback(JSON.parse(this.responseText));
      console.log(JSON.parse(this.responseText));
    } else {
      console.log("获取数据失败");
    }
  };
  xhr.onerror = function() {
    console.log("网络异常");
  };
  xhr.send();
}

function loadMusic(musicObj) {
  console.log("begin play", musicObj);
  $(".title  ").innerText = musicObj.title;
  $(".auther").innerText = musicObj.auther;
  $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')'
  audio.src = musicObj.src;
}

function generateList (list){
  
}