let video = document.querySelector("video");
let recordVideo = document.querySelector(".Record-video");
let captureVideo = document.querySelector(".Capture-video");
let constraints = {video :true};
let recordData ;
var mediaRecorder;

let state = false;


(async function(){
 // 88
  var mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

  //console.log(mediaStream);
  video.srcObject= mediaStream;
  mediaRecorder = new MediaRecorder(mediaStream);
    video.srcObject= mediaStream;
    console.log(mediaRecorder);

    mediaRecorder.onstop =function(e)
    {

    }

    mediaRecorder.onstart =function(e)
    {
        
    }

    mediaRecorder.ondataavailable =function(e)
    {
        recordData  = e.data;
        console.log(recordData);  
    }


recordVideo.addEventListener("click",function(){

    if(state) mediaRecorder.stop();
    else if(!state) mediaRecorder.start(); 

   
    state =!state;
})


})();
