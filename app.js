let words = [
    {de:"Hallo", kg:"Салам"},
    {de:"Danke", kg:"Рахмат"},
    {de:"Bitte", kg:"Сураныч"},
    {de:"Ja", kg:"Ооба"},
    {de:"Nein", kg:"Жок"},
    {de:"Haus", kg:"Үй"},
    {de:"Auto", kg:"Унаа"},
    {de:"Buch", kg:"Китеп"},
    {de:"Wasser", kg:"Суу"},
    {de:"Freund", kg:"Дос"}
];

let current = 0;
let flipped = false;
let correct = 0;

function showMode(mode){
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    document.getElementById(mode).classList.add("active");

    if(mode === "test"){
        loadTest();
    }
}

function showWord(){
    document.getElementById("word").textContent = words[current].de;
    flipped = false;
}

function flipCard(){
    if(!flipped){
        document.getElementById("word").textContent = words[current].kg;
        flipped = true;
    }
}

function nextWord(){
    current = Math.floor(Math.random() * words.length);
    showWord();
}

function knowWord(){
    nextWord();
}

function speak(){
    let text = words[current].de;
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "de-DE";
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
}

function loadTest(){
    let qIndex = Math.floor(Math.random() * words.length);
    let questionWord = words[qIndex];

    document.getElementById("question").textContent = questionWord.de;

    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML="";

    let options = [questionWord.kg];

    while(options.length < 4){
        let rand = words[Math.floor(Math.random()*words.length)].kg;
        if(!options.includes(rand)){
            options.push(rand);
        }
    }

    options.sort(()=>Math.random()-0.5);

    options.forEach(opt=>{
        let btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = function(){
            if(opt === questionWord.kg){
                correct++;
                document.getElementById("correct").textContent = correct;
            }
            loadTest();
        };
        answersDiv.appendChild(btn);
    });
}

showWord();
