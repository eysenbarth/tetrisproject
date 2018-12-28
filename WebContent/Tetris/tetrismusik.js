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
