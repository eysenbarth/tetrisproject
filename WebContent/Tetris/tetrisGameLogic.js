var verloren;
var aktuell; 					// das aktuell manipulierbare Steinchen.
var aktuellX, aktuellY; 		//Position des Tetrominos.
var SPALTEN = 10, REIHEN = 20;
var tickrate;
var tetrominos = [				// 	Tetrominoformen
	[1,1,1,1],					// 	I
    [1,1,1,0,1],				//	L
    [1,1,1,0,0,0,1],			//	J
    [1,1,0,0,1,1],				//	O
    [1,1,0,0,0,1,1],			//	Z
    [0,1,1,0,1,1],				//	S
    [0,1,0,0,1,1,1]				//	T
	];
var colors = ['cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'];

