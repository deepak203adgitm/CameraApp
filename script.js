
let video = document.querySelector("video");
  let constraints = {video :true};
(async function(){
 // 88
  var mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

  console.log(mediaStream);
  video.srcObject= mediaStream;

})();