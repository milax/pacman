
var menu = {
    gameOver: function() {
        $('#startGame').removeAttr('disabled');
        $('#pauseGame').attr('disabled', 'disabled');
    },
    gameStart: function() {
        $('#startGame').attr('disabled', 'disabled');
        $('#pauseGame').removeAttr('disabled');
    }
};
