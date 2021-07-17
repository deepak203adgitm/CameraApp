let video = document.querySelector("video");
let recordVideo = document.querySelector(".Record-video");
let  photoButton = document.querySelector(".Capture-photo");
let zoomIn = document.querySelector("#in");
let zoomOut = document.querySelector("#out");
let constraints = { video: true };
let recordData;
var mediaRecorder;

let state = false;


let maxZoom = 3;
let minZoom = 1;
let currZoom = 1;


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

        if (state) {
        mediaRecorder.stop();
        recordVideo.classList.remove("record-animate");

        }
        else if (!state) { 
            recordVideo.classList.add("record-animate");
            mediaRecorder.start();
        }
        state = !state;
    })

    photoButton.addEventListener("click", capturePhotos);


    zoomIn.addEventListener("click" , function(){
      if(currZoom + 0.1 <= maxZoom){
        currZoom += 0.1;
        video.style.transform = `scale(${currZoom})`;
      }
    });
    zoomOut.addEventListener("click" , function(){
      if(currZoom - 0.1 >= minZoom){
        currZoom -= 0.1;
        video.style.transform = `scale(${currZoom})`;
      }
    });




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


function capturePhotos() {

    photoButton.querySelector("div").classList.add("capture-animate");
  // async
  setTimeout(function(){
    photoButton.querySelector("div").classList.remove("capture-animate");
  } , 1000);

    let canvas = document.createElement("canvas");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
  
    let ctx = canvas.getContext("2d");
    if(currZoom != 1){
      ctx.translate(canvas.width/2 , canvas.height/2);
      ctx.scale(currZoom , currZoom);
      ctx.translate(-canvas.width/2 , -canvas.height/2)
    }
  
    ctx.drawImage(video, 0, 0);
  
    let imageUrl = canvas.toDataURL("image/jpg"); //canvas object => file url String
  
    let aTag = document.createElement("a");
    aTag.download = "photo.jpg";
    aTag.href = imageUrl;
    aTag.click();
  }
