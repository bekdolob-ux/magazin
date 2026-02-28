const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");

async function startCamera(){
try{
const stream = await navigator.mediaDevices.getUserMedia({
video: { facingMode: "environment" }
});
video.srcObject = stream;
}catch(err){
alert("Камера иштеген жок. Уруксат бериңиз.");
}
}

function takePhoto(){
if(!video.srcObject){
alert("Камера ачылган эмес");
return;
}

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");
ctx.drawImage(video,0,0);

photo.src = canvas.toDataURL("image/png");
}

startCamera();
