var namestr = "";
var score;
var count;
var i;

function showHighscore(){
	buildTable();
	sortTable();
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
	namestr = namefield.elements[0].value;
	setcount();
	if (typeof(Storage) !== "undefined") {
		//umständlich, da String benötigt
		localStorage.setItem(localStorage.getItem("count"),JSON.stringify({name: namestr, highscore:score}));
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}

function antiInjection(textinput) {
	var zulaessig =  /^[0-9a-zA-Z]+$/;
	if(!textinput.value.match(zulaessig)){
		inputfield.value = "";
		ctx.fillStyle = "cyan";
		ctx.fillText("Sonderzeichen sind nicht erlaubt!",400,200);
	}
}

function buildTable(){
	var table = document.createElement("TABLE");
	table.id = "dynTable"

	var tableBody = document.createElement("TBODY");
	table.appendChild(tableBody);

	for (var i = 0; i <= Number(localStorage.getItem("count")); i++) {
	  var tr = document.createElement("TR");
	  tableBody.appendChild(tr);

	  for (var j = 0; j < 2; j++) {
	    var td = document.createElement("TD");
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