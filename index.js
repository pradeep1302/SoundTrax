let myPlayer = document.getElementById("show");
let height = window.innerHeight;
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
        myPlayer.style.display = "block";
    } else {
        myPlayer.style.display = "none";
        document.getElementById('check').checked = false;
        showHidePan();
    }
}

function showHidePan() {
    let checkbox = document.getElementById('check');
    let songBox = document.getElementById('sBox');
    if (checkbox.checked) {
        songBox.style.display = "flex";
    } else {
        songBox.style.display = "none";
    }
}


var songs = ["Music.mp3", "Electro-Light.mp3", "Alone.mp3", "Rain.mp3", "Travel.mp3"];
var audio = new Audio("./Songs/" + songs[0]);
var onDeck = 1;
var playing = -1;
var progress;
var first = true;
document.addEventListener("DOMContentLoaded", function () {
    $('.song').addClass('anim');
    $('.mainImg').addClass('animappear');
    for (var i = 0; i < songs.length; i++) {
        document.getElementById("G" + (i + 1)).innerHTML = "<em>" + songs[i] + "</em>";
    }
    $(".playerTitle").text(songs[0]);
})
$(".play").click(function () {
    var request = $(this).attr("id");
    Aplay(request);
});
$(".mainPrev").click(starting);
$(".mainPrev").dblclick(prev);
function prev() {
    var request = onDeck - 1;
    if (request === 0)
        request = songs.length;
    Aplay(request);
}
function starting() {
    audio.currentTime = 0;
}
$(".mainNext").click(next);
function next() {
    var request = onDeck;
    request++;
    if (request === (songs.length + 1))
        request = 1;
    Aplay(request);
}
$(".mainPlay").click(Deck);
function Deck() {
    if (playing !== -1) {
        audio.pause();
        playing = -1;
        $(".mainPlay").attr("src", "./images/play copy.jpg");
        $(".play").attr("src", "./images/play.jpg");
        $(".gif").attr("src", "./images/Paused.jpg");
        first = false;
    }
    else {
        audio.play();
        playing = onDeck;
        $(".mainPlay").attr("src", "./images/pause copy.jpg");
        $("#" + playing).attr("src", "./images/pause.jpg");
        if (first)
            $("#G" + playing).append('<img src = "./images/Playing.gif" class= "gif" > ');
        else
            $(".gif").attr("src", "./images/Playing.gif");
        listen();
    }
}
//function controling the pause/play
function Aplay(request) {
    if (onDeck !== -1) {
        if (onDeck !== request) {
            audio.pause();
            $(".gif").remove();
            $(".play").attr("src", "./images/play.jpg");
            $(".mainPlay").attr("src", "./images/play copy.jpg");
            onDeck = request;
            playing = request;
            audio = new Audio("./Songs/" + songs[request - 1]);
            audio.play();
            listen();
            $("#" + playing).attr("src", "./images/pause.jpg");
            $("#G" + playing).append('<img src = "./images/Playing.gif" class= "gif" > ');
            $(".playerTitle").text(songs[request - 1]);
            $(".mainPlay").attr("src", "./images/pause copy.jpg");
        }
        else if (onDeck === request && playing !== -1) {
            audio.pause();
            onDeck = request;
            playing = -1;
            $(".gif").attr("src", "./images/Paused.jpg");
            $(".play").attr("src", "./images/play.jpg");
            $(".mainPlay").attr("src", "./images/play copy.jpg");
        }
        else if (onDeck === request && playing === -1) {
            audio.play();
            listen();
            playing = onDeck;
            $("#" + playing).attr("src", "./images/pause.jpg");
            $(".gif").attr("src", "./images/Playing.gif");
            $(".playerTitle").text(songs[request - 1]);
            $(".mainPlay").attr("src", "./images/pause copy.jpg");
        }
    }
    else {
        onDeck = request;
        playing = request;
        audio = new Audio("./Songs/" + songs[request - 1]);
        audio.play();
        listen();
        $("#" + playing).attr("src", "./images/pause.jpg");
        $("#G" + playing).append('<img src = "./images/Playing.gif" class= "gif" > ');
        $(".playerTitle").text(songs[request - 1]);
        $(".mainPlay").attr("src", "./images/pause copy.jpg");
    }
    first = false;
}
function listen() {
    audio.addEventListener('timeupdate', function () {
        progress = parseInt((audio.currentTime / audio.duration) * 100);
        document.querySelector(".seed").value = progress;
        document.querySelector(".timeStamp").innerHTML = formatTime(Math.round(audio.currentTime * 10) / 10) + " / " + formatTime(Math.round(audio.duration * 10) / 10);
        if (progress === 100)
            next();
    });
    document.querySelector(".seed").addEventListener("change", function () {
        audio.currentTime = ((document.querySelector(".seed").value) * (audio.duration)) / 100;
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === ' ') {
        event.preventDefault();
        Deck();
    }
    if (event.key === 'ArrowRight')
        next();
    if (event.key === 'ArrowLeft')
        prev();
});

function formatTime(time) {
    var seconds = parseInt(time);
    var min = parseInt(seconds / 60);
    var hour = parseInt(min / 60);
    min = parseInt(min % 60);
    seconds = parseInt(seconds % 60);
    if (seconds < 10)
        seconds = ("0" + seconds).slice(-2);
    if (hour !== 0)
        return hour + ":" + min + ":" + seconds;
    if (min === 0)
        return "00:" + seconds;
    if (min !== 0)
        return min + ":" + seconds;
}
