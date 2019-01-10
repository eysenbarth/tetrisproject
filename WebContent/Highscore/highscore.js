var namestr = "";
var score;
var count;
var i;

//Baut die Highscore Tabelle und sortiert sie nach Score
function showHighscore(){
	buildTable();
	sortTable();
}	

//Globaler Zähler im LocalStorage verankert für Seiten und Session übergreifendes Speichern
function setcount(){
	//Sicherheitsabfrage
	if(localStorage.getItem("count")!=null){
		//in Zahl umwandeln
		count = Number(localStorage.getItem("count"));
	}
	//wenn noch kein Count vorhanden, hier angelegt
	if(count == undefined){
		count = 0;
	} else{
		count+=1;	
	}
	//Speichern des neuen Wertes
	localStorage.setItem("count", count);
}

//Speichert den erreichten Score
function savescore(){
	//String aus Textfeld lesen
	namestr = namefield.elements[0].value;
	setcount();
	//Sicherheitsabfrage, ob LocalStorage unterstuetzt wird
	if (typeof(Storage) !== "undefined") {
		//umständlich, da String benoetigt
		localStorage.setItem(localStorage.getItem("count"),JSON.stringify({name: namestr, highscore:score}));
	} else {
		console.log("Sorry, your browser does not support Web Storage...");
	}
}

//Sicherheitsmechanismus: nur Zahlen oder Groß- und Kleinbuchstaben duerfen verwendet werden
function antiInjection(textinput) {
	var zulaessig =  /^[0-9a-zA-Z]+$/;
	//Abfrage zur Uebereinstimmung
	if(!textinput.value.match(zulaessig)){
		//Löscht Eingabe bei Erkennung eines unzulässigen Zeichens
		inputfield.value = "";
		//Canvas anzeige
		ctx.font = "30px Arial";
		ctx.fillStyle = "cyan";
		ctx.textAlign = "center";
		ctx.fillText("Sonderzeichen sind nicht erlaubt!",canvas.width/2,580);
	}
}

//Baut die Tabelle dynamisch
function buildTable(){
	//erzeugt Tabellen Element
	var table = document.createElement("TABLE");
	table.id = "dynTable"

	var tableBody = document.createElement("TBODY");
	//Erweiterung von table mit jedem "append[..]"-Befehl
	table.appendChild(tableBody);

	//von 0 bis Count; Alle Eintraege im LocalStorage
	for (var i = 0; i <= Number(localStorage.getItem("count")); i++) {
	  var tr = document.createElement("TR");
	  tableBody.appendChild(tr);
	  //0 Name, 1 Score
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
	//HighSCoReTable
	hscrTable.appendChild(table);
}

//Sortieralgorithmus von W3Schools, Variablen angepasst
function sortTable() {
	var rows, switching, x, y, shouldSwitch;
	switching = true;
	/*Make a loop that will continue until no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = dynTable.rows;
		/*Loop through all table rows:*/
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