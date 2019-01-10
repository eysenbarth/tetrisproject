var SPALTEN = 10, REIHEN = 20;
var spielfeld = [];
var verloren;
var tetromino; // Tetromino aktuell
var tetrominoX, tetrominoY; // Position des aktuellen Tetrominos
// Arrays zur Erstellung der Tetrominoformen.
var tetrominos = [
    [ 1, 1, 1, 1 ],				// I
    [ 1, 1, 1, 0,1 ], 			// L
    [ 1, 1, 1, 0, 0, 0, 1 ], 	// J
    [ 1, 1, 0, 0, 1, 1 ], 		// O
    [ 1, 1, 0, 0, 0, 1, 1 ], 	// Z
    [ 0, 1, 1, 0, 1, 1 ], 		// S
    [ 0, 1, 0, 0, 1, 1, 1 ] 	// T
];
var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

// Tetrominofarben und Formen werden durch die Arrayindizes miteinander verbunden.

var tickrate ;
var newlvl;
var notpaused;
var interval;

function newShape() {
    var id = Math.floor( Math.random() * tetrominos.length );
    var shape = tetrominos[ id ]; // ID wird verwendet um den Formen die Farben zuzuordnen.

    tetromino = [];
    for ( var y = 0; y < 4; ++y ) {
        tetromino[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            var i = 4 * y + x;
            if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
                tetromino[ y ][ x ] = id + 1;
            }
            else {
                tetromino[ y ][ x ] = 0;
            }
        }
    }
    // Startposition
    tetrominoX = 5;
    tetrominoY = 0;
}

// Räumt das Spielfeld ab, durch 0-setzen aller Variablen im Spielfeld-Array.
function init() {
    for ( var y = 0; y < REIHEN; ++y ) {
        spielfeld[ y ] = [];
        for ( var x = 0; x < SPALTEN; ++x ) {
            spielfeld[ y ][ x ] = 0;
        }
    }
}

// tickt die Steinchen runter, leert das Spielfeld und startet ggf ein Neues

function tick() {
    if ( valid( 0, 1 ) ) {
        ++tetrominoY;
    }
    // Tetromino findet position
    else {
        halten();
        leeren();
        if (verloren) {
        	//Render wird angehalten(siehe newGame())
        	clearInterval(interval);
        	ctx.font = "50px Arial";
        	ctx.fillStyle = "cyan";
        	ctx.fillText("GIT GUD", canvas.width/2, canvas.height/2);
        	//Neues Spiel Button wird wieder freigegeben
        	gameBtn.disabled = false;
        	//Pause Button wird wieder deaktiviert
        	pauseBtn.disabled = true;
        	//Score wird gespeichert 
        	savescore();
        	loseSound();
        }
        newShape();
    }
    if(notpaused && !verloren){
    	setTimeout(tick,tickrate);
    }
}

function halten() {
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( tetromino[ y ][ x ] ) {
                spielfeld[ y + tetrominoY ][ x + tetrominoX ] = tetromino[ y ][ x ];
            }
        }
    }
    settleSound();
}

function drehen( tetromino ) {
    var temptromino = [];
    for ( var y = 0; y < 4; ++y ) {
        temptromino[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            temptromino[ y ][ x ] = tetromino[ 3 - x ][ y ];
        }
    }

    return temptromino;
}

// prüft von oben nach unten ob Reihen gefüllt sind und löscht Reihen, sollten
// überall 1en sein.
// Nachtrag 18/12 Punkte Logik zu den Reihen
function leeren() {
    for ( var y = REIHEN - 1; y >= 0; --y ) {
        var rowFilled = true;
        for ( var x = 0; x < SPALTEN; ++x ) {
            if ( spielfeld[ y ][ x ] == 0 ) {
                rowFilled = false;
                break;
            }
        }
        if ( rowFilled ) {           
            for ( var yy = y; yy > 0; --yy ) {
                for ( var x = 0; x < SPALTEN; ++x ) {
                    spielfeld[ yy ][ x ] = spielfeld[ yy - 1 ][ x ];
                }
            }
            ++y;
            
            // Levelmodul eingebaut, Variiert alle 1000 Punkte. Reihen werden nacheinander gezählt
            //funktioniert dementsprechend auch, wenn zwei Reihen gleichzeitig abgearbeitet werden.
            score += 100;
            scorezeile.innerHTML = score;
            if(score/1000 == newlvl){
            	newlvl += 1;
            	tickrate -= 50;
                levelzeile.innerHTML = newlvl;
            }
            clearSound();
        }
    }
}
// übersetzt die Tasteneingaben
function keyPress( key ) {
		//keine Eingabe bei Verloren oder Pausiert möglich
		if(notpaused && !verloren){
		    switch ( key ) {
		        case 'links':
		            if ( valid( -1 ) ) {
		                --tetrominoX;
		            }
		            break;
		        case 'rechts':
		            if ( valid( 1 ) ) {
		                ++tetrominoX;
		            }
		            break;
		        case 'hinab':
		            if ( valid( 0, 1 ) ) {
		                ++tetrominoY;
		            }
		            break;
		        case 'drehen':
		            var gedreht = drehen( tetromino );
		            if ( valid( 0, 0, gedreht ) ) {
		                tetromino = gedreht;
		                rotateSound();
		            }
		            break;
		    }
		}
	
    
}
// Testet ob die Position für den Tetromino erreichbar ist.
function valid( offsetX, offsetY, temptromino ) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = tetrominoX + offsetX;
    offsetY = tetrominoY + offsetY;
    temptromino = temptromino || tetromino;



    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( temptromino[ y ][ x ] ) {
                if ( typeof spielfeld[ y + offsetY ] == 'undefined'
                  || typeof spielfeld[ y + offsetY ][ x + offsetX ] == 'undefined'
                  || spielfeld[ y + offsetY ][ x + offsetX ]
                  || x + offsetX < 0
                  || y + offsetY >= REIHEN
                  || x + offsetX >= SPALTEN ) {
                    if (offsetY == 1) verloren = true; // Tetromino an Decke
                    return false;
                }
            }
        }
    }
    return true;
}

//Pausieren Funktion
function pause() {
	if(notpaused == true){
		notpaused = false;
		pauseBtn.innerHTML = "Weiter";
		//Button mit Tickrate abschalten, um Beschleunigen der Tetrominos zu vermeiden
		pauseBtn.disabled = true;
		setTimeout(pauseTimer,tickrate);
	} else {
		notpaused = true;
		pauseBtn.innerHTML = "Pause";
		//Button mit Tickrate abschalten, um Beschleunigen der Tetrominos zu vermeiden
		pauseBtn.disabled = true;
		setTimeout(pauseTimer,tickrate);
		//Zurück zum Spiel.
		tick();
	}
}

//Funktion für setTimeout benötigt
function pauseTimer(){
	pauseBtn.disabled = false;
}

//Beginnt das Spiel, wenn im Namensfeld etwas steht
function newGame() {
	if(inputfield.value != ""){
		//Render wird alle 30ms ausgeführt
		interval = setInterval( render, 30 );
		//kein Starten während des Spiels
		gameBtn.disabled = true;
		//Pause Button aktivieren
		pauseBtn.disabled = false;
	    notpaused = true;
	    init();
	    newShape();
	    verloren = false;
	    tickrate = 500;
	    tick();
	    score = 0;
	    newlvl = 1;
	    scorezeile.innerHTML = score;
	    levelzeile.innerHTML = newlvl;
	    //wenn Musik spielen sollte, wird diese wieder gestartet
	    if(play){
	    	TetrisMelodie.play();
	    }
	}
}

//Default Text beim Laden der Seite
function startText() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "cyan";
	ctx.textAlign = "center";
	ctx.fillText("Bitte geben Sie Ihren Namen",canvas.width/2,40);
	ctx.fillText("in das Feld unter dem Fenster ein",canvas.width/2,80);
}
