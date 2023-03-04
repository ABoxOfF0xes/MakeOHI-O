document.getElementById("input").addEventListener("change", function() {
    var media = URL.createObjectURL(this.files[0]);
    var video = document.getElementById("video");
    video.src = media;
    video.style.display = "videoPlay";
    video.play();
});