//Variable zur Abfrage, ob Toene allgemein gespielt werden sollen
var play = false;

//Starten oder Stoppen der Hintergrundusik, gleichzeitig veraendern von play
function audioScript() {
	if (play) {
		TetrisMelodie.pause();
		play = false;
		document.getElementById("mbutton").innerHTML = "Ton an";
	} else {
		TetrisMelodie.play();
		play = true;
		document.getElementById("mbutton").innerHTML = "Ton aus"
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

//Verloren Geraeusch, setzt die Hintergrundmusik zurück
function loseSound(){
	if(play){
		GameOver.play();
		TetrisMelodie.pause();
		TetrisMelodie.currentTime = 0;
	}
}