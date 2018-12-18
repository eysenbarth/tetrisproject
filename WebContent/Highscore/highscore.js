var namestr = "";
var score = "";
var count;

function get(){
	//hier ein String
	count = localStorage.getItem("count");
	result.innerHTML = JSON.parse(localStorage.getItem(count)).name + " " +  JSON.parse(localStorage.getItem(count)).highscore;
}	

function getHighscore(){
	//var x = document.getElementById("namefield");
	//var y = document.getElementById("testscore");
	namestr = namefield.elements[0].value;
	score = testscore.elements[0].value;
}

function setcount(){
	if(localStorage.getItem("count")!=null){
		//in Zahl umwandeln
		count = Number(localStorage.getItem("count"));
	}
	if(count == undefined){
		count = 0;
	} else{
		count+=1;	
	}	
	alert(count);
}

function savescore(){
	getHighscore();
	setcount();
	localStorage.setItem("count", count);
	if (typeof(Storage) !== "undefined") {
		//umständlich, da String benötigt
		localStorage.setItem(localStorage.getItem("count"),JSON.stringify({name: namestr, highscore:score}));
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}