/**	Als Quelle für Keycodes: 
 * 	https://css-tricks.com/snippets/javascript/javascript-keycodes/
 *	Tastenbelegung für WASD und Pfeilsteuerung festgelegt um sie
 *	später im Funktionsaufruf für Keypress nutzen zu können.
 */

document.body.onkeydown = function(taste) {
	var tasten = {
		37 : 'links',
		65 : 'links',
		39 : 'rechts',
		68 : 'rechts',
		40 : 'hinab',
		83 : 'hinab',
		38 : 'drehen',
		87 : 'drehen'
	};

	if (typeof tasten[taste.keyCode] != 'undefined') {
		keyPress(tasten[taste.keyCode]);
	}
};
