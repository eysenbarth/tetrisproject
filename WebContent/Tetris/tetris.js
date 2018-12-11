var play = 0; 

function audioScript() { 
	if (play != 0) { 
		TetrisMelodie.pause(); 
		play = 0; 
		document.getElementById("mbutton").innerHTML = "Musik abspielen"; 
	} else { 
		TetrisMelodie.play(); 
		play = 1; 
		document.getElementById("mbutton").innerHTML = "Musik pausieren" 
	} 
} 
		 
	