function get(){

	document.getElementById("result").innerHTML = JSON.parse(localStorage.getItem("high")).name + " " +  JSON.parse(localStorage.getItem("high")).highscore;
}	