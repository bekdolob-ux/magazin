function startFun(){

// Fullscreen
if(document.documentElement.requestFullscreen){
document.documentElement.requestFullscreen();
}

// Музыка
const sound = document.getElementById("sound");
sound.play();

// Вибрация
if(navigator.vibrate){
navigator.vibrate([500,200,500]);
}

// Flash эффект
document.body.style.background="white";
setTimeout(()=>{
document.body.style.background="black";
},200);

// Fake freeze
const freeze = document.getElementById("freeze");
freeze.classList.remove("hidden");

setTimeout(()=>{
freeze.classList.add("hidden");
},3000);

           }
