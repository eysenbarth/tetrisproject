var SPALTEN = 10, REIHEN = 20;
var spielfeld = [];
var verloren;
var interval;
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
    //Startposition
    tetrominoX = 5;
    tetrominoY = 0;
}

//räumt das Spielfeld ab durch 0-setzen aller Variablem im Spielfeld Array.
function init() {
    for ( var y = 0; y < REIHEN; ++y ) {
        spielfeld[ y ] = [];
        for ( var x = 0; x < SPALTEN; ++x ) {
            spielfeld[ y ][ x ] = 0;
        }
    }
}

// tickt die Steinchen runter, leert das spielfeld und startet ggf ein neues Spiel. Hier ggf die kontrollstruktur einbauen für abfrage für neues spiel?
function tick() {
    if ( valid( 0, 1 ) ) {
        ++tetrominoY;
    }
    // if the element settled
    else {
        halten();
        leeren();
        if (verloren) {
            newGame();
            return false;
        }
        newShape();
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

// prüft von oben nach unten ob Reihen gefüllt sind.
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
        }
    }
}
//übersetzt die Tasteneingaben
function keyPress( key ) {
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
                    if (offsetY == 1) verloren = true; // Tetromino stößt oben an
                    return false;
                }
            }
        }
    }
    return true;
}

function newGame() {
    clearInterval(interval);
    init();
    newShape();
    verloren = false;
    interval = setInterval( tick, 250 );
}