let video = document.querySelector("video");
let recordVideo = document.querySelector(".Record-video");
let captureVideo = document.querySelector(".Capture-video");
let constraints = { video: true };
let recordData;
var mediaRecorder;

let state = false;


(async function () {
    // 88
    var mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    //console.log(mediaStream);
    video.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);
    video.srcObject = mediaStream;
    console.log(mediaRecorder);

    mediaRecorder.onstop = function (e) {

    }

    mediaRecorder.onstart = function (e) {

    }

    mediaRecorder.ondataavailable = function (e) {
        recordData = e.data;
        console.log(recordData);

        savevideo();
    }


    recordVideo.addEventListener("click", function () {

        if (state) 
        mediaRecorder.stop(), recordVideo.innerHTML ="Record";
        else if (!state) mediaRecorder.start(), recordVideo.innerHTML ="Recording";


        state = !state;
    })


})();


function savevideo()
{
console.log("saving video ");

let url =URL.createObjectURL(recordData);
console.log(url);

let aTag = document.createElement("a");
aTag.download= "video.mp4";
aTag.href =url;
aTag.click();
aTag.remove();


}
