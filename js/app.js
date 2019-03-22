
const STARTBUTTON = document.getElementById('introbutton');
var vraag = 0;
var title = subjects[vraag]["title"];
var statement = subjects[vraag]["statement"];
var antwoord = [];

STARTBUTTON.onclick = function(){
document.getElementById('intro').style.display = 'none';
document.getElementById('statements').style.display = 'block';
document.getElementById('title').innerHTML = title;
document.getElementById('statement').innerHTML = statement;
}


function answer(answer){
  antwoord[vraag] = answer;
}
