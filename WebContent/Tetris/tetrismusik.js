var audio = document.getElementById("TetrisMelodie");
		var play = 0;
		var namestr = "";
		var score = "";

		function audioScript() {
			if (play != 0) {
				audio.pause();
				play = 0;
				document.getElementById("mbutton").innerHTML = "Musik abspielen";
			} else {
				audio.play();
				play = 1;
				document.getElementById("mbutton").innerHTML = "Musik pausieren"
			}
		}
		
		function getHighscore(){
			//var x = document.getElementById("namefield");
			//var y = document.getElementById("testscore");
			namestr = namefield.elements[0].value;
			score = testscore.elements[0].value;
		}
		function savescore(){
			getHighscore();
			if (typeof(Storage) !== "undefined") {
			localStorage.setItem("high",JSON.stringify({name: namestr, highscore:score}));
			} else {
				alert("Sorry, your browser does not support Web Storage...");
			}
		}