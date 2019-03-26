

let start = 0;
let questionNumber = 0;
let showPartysThought = 1;
let skipCounter = 0;



let awnsers = [];
let awnsersMultiplier =[];
let data = [];
let secularity = "all";
let bigparty = false;
let requiredpartysize = 20;
let totalquestions = subjects.length;


let extraSection = document.getElementById('startsection');
let othersSection = document.getElementById('others');
let sections = document.getElementById('section');

let partiesTextSection = document.getElementById('partiesopinion');
let pro = document.getElementById('pro');
let ambivalent = document.getElementById('ambivalent');
let contra = document.getElementById('contra');

let resetButton = document.getElementById('reset');
let startButton = document.getElementById('start');

// titel + tekst
let title = document.getElementById('titel');
let statement = document.getElementById('statement');
// de opties
let option1 = document.getElementById('option1');
let option2 = document.getElementById('option2');
let option3 = document.getElementById('option3');
let optionSkip = document.getElementById('optionskip');
let questionMultiplierBox = document.getElementById('questionMultiplierBox');



function onloadHead() {
	if (start === 0) {
		resetButton.style.display = 'none';
		startButton.style.display = 'block ';
		othersSection.style.display = 'none';
		partiesTextSection.style.display = 'none';
	}
	if (start === 1) {
		resetButton.style.display = 'block';
		startButton.style.display = 'none ';
		othersSection.style.display = 'block';
		partiesTextSection.style.display = 'flex';
	}
}



function upQuestion(givenAwnser, multiplier) {
	awnser(givenAwnser, multiplier);
	if (questionNumber < subjects.length -1) {
		return questionNumber++, nextQuestion();
	} else {
		getResults();
		resetButton.style.display = 'none';
		startButton.style.display = 'none '
		othersSection.style.display = 'none';
		partiesTextSection.style.display = 'none';
	}
}

function backQuestion() {
	if (questionNumber > 0) {
		return questionNumber--, nextQuestion();
	}
	//if you are at the first question then reload
	if (questionNumber-- === 0) {
		location.reload();
	}
}

function awnser(givenAwnser, multiplier) {
 		if (multiplier === 'x2') {
		return awnsers[questionNumber] = givenAwnser, awnsersMultiplier[questionNumber] = 'x2';
	} else {
		return awnsers[questionNumber] = givenAwnser;
	}
}


function nextQuestion() {
	if (start === 0) {
		start = 1;
	}
	onloadHead();

	let titlestr = questionNumber+1;
	titlestr += '. ';
	titlestr += subjects[questionNumber]['title'];
	title.innerHTML = titlestr;
	statement.innerHTML = subjects[questionNumber]['statement'];




	pro.innerHTML = "<h3>Eens</h3>";
	ambivalent.innerHTML = "<h3>Geen van beide</h3>";
	contra.innerHTML = "<h3>Oneens</h3>";

	for(let i = 1; i < subjects[questionNumber]['parties'].length - 1;i++){

		let details = document.createElement("section");
		let party = document.createElement("h4");
		let explanation = document.createElement("p");
		let partyname = subjects[questionNumber]['parties'][i]['name'];
		party.innerHTML = partyname;
		explanation.innerHTML = subjects[questionNumber]['parties'][i]['explanation'];
		explanation.id = partyname;
		explanation.classList.add("w3-hide");

		party.setAttribute("onClick","toggleOpinion('"+partyname+"')");

		details.appendChild(party);
		details.appendChild(explanation);

		if(subjects[questionNumber]['parties'][i]['position'] == 'pro'){
			pro.appendChild(details);
		}
		else if(subjects[questionNumber]['parties'][i]['position'] == 'ambivalent'){
			ambivalent.appendChild(details);
		}
		else if(subjects[questionNumber]['parties'][i]['position'] == 'contra'){
			contra.appendChild(details);
		}
	}


	// kleur van buttons
	if (awnsers[questionNumber] != null) {
		if (awnsers[questionNumber] === 'pro') {
			option1.classList.add("chosen");
			option2.classList.remove("chosen");
			option3.classList.remove("chosen");
			optionSkip.classList.remove("chosen");
		}
		else if (awnsers[questionNumber] === 'ambivalent') {
			option1.classList.remove("chosen");
			option2.classList.add("chosen");
			option3.classList.remove("chosen");
			optionSkip.classList.remove("chosen");
		}
		else if (awnsers[questionNumber] === 'contra') {
			option1.classList.remove("chosen");
			option2.classList.remove("chosen");
			option3.classList.add("chosen");
			optionSkip.classList.remove("chosen");
		}
		else if(awnsers[questionNumber] === 'skip'){
			option1.classList.remove("chosen");
			option2.classList.remove("chosen");
			option3.classList.remove("chosen");
			optionSkip.classList.add("chosen");
		}
	}



// voert de

	resetButton.setAttribute("onClick", "backQuestion();");
	option1.setAttribute("onClick", "upQuestion('pro', 'x1')");
	option2.setAttribute("onClick", "upQuestion('ambivalent', 'x1')");
	option3.setAttribute("onClick", "upQuestion('contra', 'x1')");
	optionSkip.setAttribute("onClick", "upQuestion('skip')");
	questionMultiplierBox.addEventListener("change", function (event) {
		if (event.target.checked == true) {
			option1.setAttribute("onClick", "upQuestion('pro', 'x2')");
			option2.setAttribute("onClick", "upQuestion('ambivalent', 'x2')");
			option3.setAttribute("onClick", "upQuestion('contra', 'x2')");
			optionSkip.setAttribute("onClick", "upQuestion('skip')");
		}
		if (event.target.checked == false) {
			option1.setAttribute("onClick", "upQuestion('pro', 'x1')");
			option2.setAttribute("onClick", "upQuestion('ambivalent', 'x1')");
			option3.setAttribute("onClick", "upQuestion('contra', 'x1')");
			optionSkip.setAttribute("onClick", "upQuestion('skip')");
		}
	});

}

function changePartyLimit() {
	let button = document.getElementById('party-size');
	extraSection.innerHTML = "";
	if (bigparty == false) {
		console.log('set true');
		return bigparty = true, getResults();
	}
	else{
		console.log('set false');
		return bigparty = false, getResults();
	}
}


function changesecu() {
	let secbutton = document.getElementById('sec-button');
	extraSection.innerHTML = "";
	if (secularity == "all") {

		return secularity = "true", getResults();
	}
	if (secularity == "true") {
		return secularity = "false", getResults();
	}
	if (secularity == "false") {

		return secularity = "all", getResults();
	}
}

function getResults() {
	title.innerHTML = "Welke partijen wilt u meenemen in het resultaat?";
	statement.innerHTML = "U kunt kiezen voor zittende partijen, die nu in de Tweede Kamer vertegenwoordigd zijn. \n\
			Daarbij nemen we ook de partijen mee die in de peilingen op minimaal één zetel staan. \n\
			U kunt alle partijen meenemen en u kunt een eigen selectie maken van tenminste drie partijen.";

		let button = document.createElement("button");
		let t = document.createTextNode("Resultaat");
		button.appendChild(t);
		button.id = "savebutton";
		button.className = "btn";
		button.setAttribute("onclick", "checkparties()");
		extraSection.appendChild(button);

	let btn = document.createElement("button");
	btntext = document.createTextNode("Alles");
	if(secularity == "all"){
	 btntext = document.createTextNode("Alles");
	}
	if(secularity == "true"){
		btntext = document.createTextNode("Seculair");
	}
	if(secularity == "false"){
		btntext = document.createTextNode("Niet-Seculair");
	}

	let tekst = document.createElement("p");
	tekst.innerHTML = "De Partijen";
	extraSection.appendChild(tekst);

	btn.appendChild(btntext);
	btn.setAttribute("onclick", "changesecu()");
	btn.id = "sec-button";
	btn.className = "btn-choose";
	extraSection.appendChild(btn);

	let partybutton = document.createElement("button");
	partybutton.innerHTML = "Selecteer alleen grote partijen";
	partybutton.setAttribute("onclick", "changePartyLimit()");
	partybutton.className = "btn-choose";
	partybutton.id = "party-size";
	extraSection.appendChild(partybutton);

	if (bigparty) {
		partybutton.classList.add("chosen");
		if (secularity == "all") {
			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				if( parties[i]['size'] >= requiredpartysize ){
				let tr = document.createElement('tr');
				tr.classList.add("trs");
				tr.value = parties[i]['name'];
				extraSection.appendChild(tr);
				let checkbox = document.createElement('input');
				let p = document.createElement('p');
				checkbox.type = 'checkbox';
				checkbox.value = parties[i]['name'];
				checkbox.classList.add("resultCheckbox");
				tr.appendChild(checkbox);
				let partyname = document.createTextNode(parties[i]['name']);
				tr.appendChild(p);
				p.appendChild(partyname);
				checkbox.addEventListener("change", function (event) {
					if (event.target.checked == true) {
						//console.log("true")
						data.push(event.target.value)
						//console.log(data);
					}
					if (event.target.checked == false) {
						let dtaalength = data.length;
						for (let datainfo = 0; datainfo < dtaalength; datainfo++) {
							if (event.target.value == data[datainfo]) {
								data[datainfo] = null;
								//console.log(data);
							}
						}
					}
				});
				}
			}
		}
		if (secularity == "true") {
			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				if (parties[i]['secular'] == true && parties[i]['size'] >= requiredpartysize) {
					let tr = document.createElement('tr');
					tr.classList.add("trs");
					tr.value = parties[i]['name'];
					extraSection.appendChild(tr);
					let checkbox = document.createElement('input');
					let p = document.createElement('p');
					checkbox.type = 'checkbox';
					checkbox.value = parties[i]['name'];
					tr.appendChild(checkbox);
					let partyname = document.createTextNode(parties[i]['name']);
					tr.appendChild(p);
					p.appendChild(partyname);
					checkbox.addEventListener("change", function (event) {
						if (event.target.checked == true) {
							//console.log("true")
							data.push(event.target.value)
							//console.log(data);
						}
						if (event.target.checked == false) {
							let dtaalength = data.length;
							for (let datainfo = 0; datainfo < dtaalength; datainfo++) {
								if (event.target.value == data[datainfo]) {
									data[datainfo] = null;
									//console.log(data);
								}
							}
						}
					});
				}
			}
		}
		if (secularity == "false") {
			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				if (parties[i]['secular'] == false && parties[i]['size'] >= requiredpartysize) {
					let tr = document.createElement('tr');
					tr.classList.add("trs");
					tr.value = parties[i]['name'];
					extraSection.appendChild(tr);
					let checkbox = document.createElement('input');
					let p = document.createElement('p');
					checkbox.type = 'checkbox';
					checkbox.value = parties[i]['name'];
					tr.appendChild(checkbox);
					let partyname = document.createTextNode(parties[i]['name']);
					tr.appendChild(p);
					p.appendChild(partyname);
					checkbox.addEventListener("change", function (event) {
						if (event.target.checked == true) {
							//("true")
							data.push(event.target.value)
							//console.log(data);
						}
						if (event.target.checked == false) {
							let dtaalength = data.length;
							for (let datainfo = 0; datainfo < dtaalength; datainfo++) {
								if (event.target.value == data[datainfo]) {
									data[datainfo] = null;
									//console.log(data);
								}
							}
						}
					});

				}
			}
		}
	}
	else{
		partybutton.classList.remove("chosen");
		if (secularity == "all") {
			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				let tr = document.createElement('tr');
				tr.classList.add("trs");
				tr.value = parties[i]['name'];
				extraSection.appendChild(tr);
				let checkbox = document.createElement('input');
				let p = document.createElement('p');
				checkbox.type = 'checkbox';
				checkbox.value = parties[i]['name'];
				checkbox.classList.add("resultCheckbox");
				tr.appendChild(checkbox);
				let partyname = document.createTextNode(parties[i]['name']);
				tr.appendChild(p);
				p.appendChild(partyname);
				checkbox.addEventListener("change", function (event) {
					if (event.target.checked == true) {
						//console.log("true")
						data.push(event.target.value)
						//console.log(data);
					}
					if (event.target.checked == false) {
						let dtaalength = data.length;
						for (let datainfo = 0; datainfo < dtaalength; datainfo++) {
							if (event.target.value == data[datainfo]) {
								data[datainfo] = null;
								//console.log(data);
							}
						}
					}
				});

			}
		}
		if (secularity == "true") {
			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				if (parties[i]['secular'] == true) {
					let tr = document.createElement('tr');
					tr.classList.add("trs");
					tr.value = parties[i]['name'];
					extraSection.appendChild(tr);
					let checkbox = document.createElement('input');
					let p = document.createElement('p');
					checkbox.type = 'checkbox';
					checkbox.value = parties[i]['name'];
					tr.appendChild(checkbox);
					let partyname = document.createTextNode(parties[i]['name']);
					tr.appendChild(p);
					p.appendChild(partyname);
					checkbox.addEventListener("change", function (event) {
						if (event.target.checked == true) {
							//console.log("true")
							data.push(event.target.value)
							//console.log(data);
						}
						if (event.target.checked == false) {
							let dtaalength = data.length;
							for (let datainfo = 0; datainfo < dtaalength; datainfo++) {
								if (event.target.value == data[datainfo]) {
									data[datainfo] = null;
									//console.log(data);
								}
							}
						}
					});
				}
			}
		}
		if (secularity == "false") {
			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				if (parties[i]['secular'] == false) {
					let tr = document.createElement('tr');
					tr.classList.add("trs");
					tr.value = parties[i]['name'];
					extraSection.appendChild(tr);
					let checkbox = document.createElement('input');
					let p = document.createElement('p');
					checkbox.type = 'checkbox';
					checkbox.value = parties[i]['name'];
					tr.appendChild(checkbox);
					let partyname = document.createTextNode(parties[i]['name']);
					tr.appendChild(p);
					p.appendChild(partyname);
					checkbox.addEventListener("change", function (event) {
						if (event.target.checked == true) {
							//("true")
							data.push(event.target.value)
							//console.log(data);
						}
						if (event.target.checked == false) {
							let dtaalength = data.length;
							for (let datainfo = 0; datainfo < dtaalength; datainfo++) {
								if (event.target.value == data[datainfo]) {
									data[datainfo] = null;
									//console.log(data);
								}
							}
						}
					});

				}
			}
		}
	}
}

function checkparties() {
	if (data.length < 3) {
		alert("kies alstublieft minimaal 3 partijen");
	} else {
		showResults();
	}
}

function showResults() {
	totalpoints= totalquestions + awnsersMultiplier.length;
	var percentage = 100 / totalpoints;
	extraSection.style.display = 'none';
	statement.style.display = 'none';
	if (skipCounter >= 5) {
		title.innerHTML = "u heeft teveel vragen overgeslagen wij kunnen u geen goed antwoord geven";
	} else {

		// checks if the awnsers of the partys is the same as the given awnsers, if so they get a +1 score for every awnser thats the same
		for (let q = 0; q < subjects.length; q++) {
			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				if (subjects[q]['parties'][i]['position'] == awnsers[q]){
					let partijnaam = subjects[q]['parties'][i]['name'];
					if (awnsersMultiplier[q] === 'x2') {
						parties.find( partije => partije.name === partijnaam)['score'] = +2;
					} else {
						parties.find( partije => partije.name === partijnaam)['score']++;
					}

				}
			}
		}

		title.innerHTML = "Uw mening komt het best overeen met :";
		statement.style.display = 'none';

		parties.sort(function(obj1, obj2) {
			return obj2.score - obj1.score;
		}
		);

			for (let i = 0; i < getTotalAmountOfPartys(); i++) {
				console.log(parties[i].score);
				if (data.includes(parties[i]['name'])) {
						let partij = document.createElement("h3");
						let score = document.createElement("p");
						partij.innerHTML = parties[i].name;
						score.innerHTML = Math.floor(percentage * parties[i].score) + "%";
						sections.appendChild(partij);
						sections.appendChild(score);
				}
			}
	}
}

function getTotalAmountOfPartys() {
	return parties.length;
}




function toggleOpinion(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
