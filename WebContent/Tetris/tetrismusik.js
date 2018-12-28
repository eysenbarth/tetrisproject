var play = false;

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

function rotateSound(){
	if(play){
		Rotate.play()
	}
}

function clearSound(){
	if(play){
		Line.play();
	}
}

function settleSound(){
	if(play){
		Fall.play();
	}
}

function loseSound(){
	if(play){
		GameOver.play();
		TetrisMelodie.pause();
		TetrisMelodie.currentTime = 0;
	}
}