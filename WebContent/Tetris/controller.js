document.body.onkeydown = function( taste ) {
    var tasten = {
        37: 'links',
        39: 'rechts',
        40: 'hinab',
        38: 'drehen'
    };
    if ( typeof tasten[ taste.keyCode ] != 'undefined' ) {
        keyPress( tasten[ taste.keyCode ] );
    }
};
