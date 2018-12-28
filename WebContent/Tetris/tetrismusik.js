//Variable zur Abfrage, ob Musik allgemein gespielt werden soll
var play = false;

//Starten oder Stoppen der Musik, gleichzeitig veraendern von Play
function audioScript() {
	if (play) {
		TetrisMelodie.pause();
		play = false;
		document.getElementById("mbutton").innerHTML = "Musik abspielen";
	} else {
		TetrisMelodie.play();
		play = true;
		document.getElementById("mbutton").innerHTML = "Musik pausieren"
	}
}

//Drehen Geraeusch
function rotateSound(){
	if(play){
		Rotate.play()
	}
}

//Reihe zerstoert Geraeusch
function clearSound(){
	if(play){
		Line.play();
	}
}

//Block setz auf Geraeusch
function settleSound(){
	if(play){
		Fall.play();
	}
}

//Verloren Geraeusch
function loseSound(){
	if(play){
		GameOver.play();
		TetrisMelodie.pause();
		TetrisMelodie.currentTime = 0;
	}
}