<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>AI Police Security</title>

<style>
body{
margin:0;
background:#000;
color:#00f7ff;
font-family:Arial;
text-align:center;
transition:0.3s;
}

h1{margin-top:10px;}

video{
width:95%;
margin-top:10px;
border:2px solid #00f7ff;
border-radius:10px;
}

.status{
margin-top:15px;
font-size:22px;
}

.safe{color:#00ff88;}
.warn{color:#ffcc00;}
.danger{color:#ff0040;}

.flash{
background:white !important;
color:black !important;
}

button{
margin-top:10px;
padding:12px;
width:80%;
background:#00f7ff;
border:none;
font-weight:bold;
border-radius:6px;
}
</style>
</head>

<body>

<h1>🚨 POLICE AI SECURITY</h1>

<video id="video" autoplay></video>

<div id="status" class="status safe">ЗОНА ТИХАЯ 🟢</div>

<button onclick="startCam()">START CAMERA</button>

<script>

let video=document.getElementById("video");
let status=document.getElementById("status");

let lastFrame=null;
let active=false;

// 🤖 ROBOT VOICE (strong)
function robotSpeak(text){
let msg=new SpeechSynthesisUtterance(text);
msg.lang="ru-RU";
msg.rate=0.75;
msg.pitch=0.2;
msg.volume=1;
speechSynthesis.speak(msg);
}

// 🚨 POLICE SIREN
function siren(){
let audio=new Audio("https://actions.google.com/sounds/v1/alarms/police_siren.ogg");
audio.volume = 1;
audio.play();
}

// 📷 CAMERA
function startCam(){
navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject=stream;
detect();
});
}

// 👁️ MOTION DETECT
function detect(){

let canvas=document.createElement("canvas");
let ctx=canvas.getContext("2d");

setInterval(()=>{

if(video.videoWidth===0) return;

canvas.width=video.videoWidth;
canvas.height=video.videoHeight;

ctx.drawImage(video,0,0);

let frame=ctx.getImageData(0,0,canvas.width,canvas.height);

if(lastFrame){

let diff=0;

for(let i=0;i<frame.data.length;i+=70){
diff += Math.abs(frame.data[i]-lastFrame.data[i]);
}

// 🚨 STRONG ALERT
if(diff>20000 && !active){
active=true;

triggerAlarm();
}

}

lastFrame=frame;

},1000);
}

// 🚨 FULL ALARM SEQUENCE
function triggerAlarm(){

document.body.classList.add("flash");

status.innerText="🚨 ОБЪЕКТ ОБНАРУЖЕН!";
status.className="status danger";

// 🚨 1) SIREN
siren();

// 🤖 2) ROBOT VOICE (multi step)
robotSpeak("Внимание! Вы вошли в охраняемую зону.");

setTimeout(()=>{
robotSpeak("Система безопасности активирована. Ведётся запись.");
},3000);

setTimeout(()=>{
robotSpeak("Немедленно покиньте территорию. Это последнее предупреждение.");
},6000);

// reset
setTimeout(()=>{
document.body.classList.remove("flash");
status.innerText="ЗОНА ТИХАЯ 🟢";
status.className="status safe";
active=false;
},9000);

}

</script>

</body>
</html>
