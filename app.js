const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject = stream;
})
.catch(err=>{
alert("Камера уруксаты керек");
});

function takePhoto(){
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");
ctx.drawImage(video,0,0);

photo.src = canvas.toDataURL("image/png");
}
