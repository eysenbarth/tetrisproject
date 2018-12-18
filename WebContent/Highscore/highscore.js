var namestr = "";
var score;
var count;
var chart = new Array();
var i;

function get(){
	//hier ein String
	count = localStorage.getItem("count");
	for(i = 0;i <= Number(count);i++){
		chart[i] = JSON.parse(localStorage.getItem(JSON.stringify(i))).name + " " +  JSON.parse(localStorage.getItem(JSON.stringify(i))).highscore;
	}
	//result.innerHTML = JSON.parse(localStorage.getItem(count)).name + " " +  JSON.parse(localStorage.getItem(count)).highscore;
	result.innerHTML = chart;
	buildTable();
}	

function getHighscore(){
	namestr = namefield.elements[0].value;
	//score = testscore.elements[0].value;
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

function buildTable(){
	 var table = document.createElement('TABLE');
	 table.border = '1';

	 var tableBody = document.createElement('TBODY');
	 table.appendChild(tableBody);

	 for (var i = 0; i <= Number(count); i++) {
	   var tr = document.createElement('TR');
	   tableBody.appendChild(tr);

	   for (var j = 0; j < 2; j++) {
	     var td = document.createElement('TD');
	     td.width = '75';
	     if(j == 0){
	    	 td.appendChild(document.createTextNode(JSON.parse(localStorage.getItem(JSON.stringify(i))).name));
	    	 tr.appendChild(td);
	     }else{
	    	 td.appendChild(document.createTextNode(JSON.parse(localStorage.getItem(JSON.stringify(i))).highscore));
	    	 tr.appendChild(td);
	     }
	   }
	 }
	 hscrTable.appendChild(table);
}