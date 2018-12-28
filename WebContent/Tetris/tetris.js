var SPALTEN = 10, REIHEN = 20;
var spielfeld = [];
var verloren;
var tetromino; // tetromino aktuell
var tetrominoX, tetrominoY; // position des tetrominos
var tetrominos = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];
var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];
var tickrate ;
var newlvl;
var notpaused;
var interval;

function newShape() {
    var id = Math.floor( Math.random() * tetrominos.length );
    var shape = tetrominos[ id ]; 

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

// räumt das Spielfeld ab durch 0-setzen aller Variablem im Spielfeld Array.
function init() {
    for ( var y = 0; y < REIHEN; ++y ) {
        spielfeld[ y ] = [];
        for ( var x = 0; x < SPALTEN; ++x ) {
            spielfeld[ y ][ x ] = 0;
        }
    }
}

// tickt die Steinchen runter, leert das spielfeld und startet ggf ein neues

function tick() {
    if ( valid( 0, 1 ) ) {
        ++tetrominoY;
    }
    // tetromino findet position
    else {
        halten();
        leeren();
        if (verloren) {
        	clearInterval(interval);
        	ctx.font = "50px Arial";
        	ctx.fillStyle = "cyan";
        	ctx.fillText("GIT GUD", canvas.width/2, canvas.height/2);
        	gameBtn.disabled = false;
        	nope = true;
        	savescore();
        }
        newShape();
    }
    if(notpaused){
    	setTimeout(tick,tickrate);
    }
    levelzeile.innerHTML = newlvl;
}

function halten() {
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( tetromino[ y ][ x ] ) {
                spielfeld[ y + tetrominoY ][ x + tetrominoX ] = tetromino[ y ][ x ];
            }
        }
    }
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

// prüft von oben nach unten ob Reihen gefüllt sind und löscht reihen, sollten
// überall 1en sein.
// nachtrag 18/12 punkte logik zu den reihen
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
            score += 100;
            scorezeile.innerHTML = score;
            if(score/1000 == newlvl){
            	newlvl += 1;
            	tickrate -= 50;
            }
           
        }
    }
}
// übersetzt die Tasteneingaben
function keyPress( key ) {
	
	if(notpaused){
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

function pause() {
	if(notpaused == true){
		notpaused = false;
		pauseBtn.innerHTML = "Weiter";
	} else {
		notpaused = true;
		pauseBtn.innerHTML = "Pause";
	}
}

function newGame() {
	if(inputfield.value != ""){
		interval = setInterval( render, 30 );
		gameBtn.disabled = true;
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
	}
}

function startText() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "cyan";
	ctx.textAlign = "center";
	ctx.fillText("Bitte geben Sie Ihren Namen",canvas.width/2,40);
	ctx.fillText("in das Feld unter dem Fenster ein",canvas.width/2,80);
}
