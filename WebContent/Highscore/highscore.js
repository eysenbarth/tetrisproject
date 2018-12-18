var namestr = "";
var score;
var count;
var chart = new Array();
var i;

function showHighscore(){
	//hier ein String
	//count = localStorage.getItem("count");
//	for(i = 0;i <= Number(count);i++){
//		chart[i] = JSON.parse(localStorage.getItem(JSON.stringify(i))).name + " " +  JSON.parse(localStorage.getItem(JSON.stringify(i))).highscore;
//	}
	//result.innerHTML = JSON.parse(localStorage.getItem(count)).name + " " +  JSON.parse(localStorage.getItem(count)).highscore;
	//result.innerHTML = chart;
	buildTable();
	sortTable();
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

	localStorage.setItem("count", count);
}

function savescore(){
	getHighscore();
	setcount();
	if (typeof(Storage) !== "undefined") {
		//umständlich, da String benötigt
		localStorage.setItem(localStorage.getItem("count"),JSON.stringify({name: namestr, highscore:score}));
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}

function buildTable(){
	var table = document.createElement("TABLE");
	table.border = 1;
	table.id = "dynTable"

	var tableBody = document.createElement("TBODY");
	table.appendChild(tableBody);

	for (var i = 0; i <= Number(localStorage.getItem("count")); i++) {
	  var tr = document.createElement("TR");
	  tableBody.appendChild(tr);

	  for (var j = 0; j < 2; j++) {
	    var td = document.createElement("TD");
	    td.width = 75;
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

function sortTable() {
	var rows, switching, x, y, shouldSwitch;
	switching = true;
	/*Make a loop that will continue until no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = dynTable.rows;
		/*Loop through all table rows (except the first, which contains table headers):*/
		for (i = 0; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare, one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[1];
			y = rows[i + 1].getElementsByTagName("TD")[1];
			//check if the two rows should switch place:
			if (Number(x.innerHTML) < Number(y.innerHTML)) {
				//if so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

function clearStorage(){
	//debug Function, use with caution!
	localStorage.clear();
}