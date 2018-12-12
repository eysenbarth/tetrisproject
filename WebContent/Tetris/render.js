/**Renderfunktion für die Blöcke der Tetrominos und des Spielfelds.
 * 
 */

var canvas = document.getElementsByTagName( 'Canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 480, H = 640;
var BLOCK_W = W / SPALTEN, BLOCK_H = H / REIHEN;

// Erstellt einen Block bei (x, y) im Verhältnis zu der Spielfeldeinteilung
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}


function render() {
    ctx.clearRect( 0, 0, W, H );

    ctx.strokeStyle = 'black';
    for ( var x = 0; x < SPALTEN; ++x ) {
        for ( var y = 0; y < REIHEN; ++y ) {
            if ( spielfeld[ y ][ x ] ) {
                ctx.fillStyle = colors[ spielfeld[ y ][ x ] - 1 ];
                drawBlock( x, y );
            }
        }
    }

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( tetromino[ y ][ x ] ) {
                ctx.fillStyle = colors[ tetromino[ y ][ x ] - 1 ];
                drawBlock( tetrominoX + x, tetrominoY + y );
            }
        }
    }
}

setInterval( render, 30 );
