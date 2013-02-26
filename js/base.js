/*

    Pacman
    JS

    Author: Eugene Kuzmin
    Copyright: 2013

-----------------------------------------------------------------------*/

var stopGame = function() {
    clearInterval(pacmanInterval);
    clearInterval(enemiesInterval);
    clearInterval(crashInterval);
};

var continueGame = function() {
    setCustomInterval.pacman();
    setCustomInterval.enemies();
    setCustomInterval.crashCheck();
};

/* Returns True if it's crash
   ========================================================================== */
var checkCrash = function() {
    var enemyX, enemyY;

    for(var i = 0; i < enemies.length; i++) {
        enemyX = enemies[i].coords.x;
        enemyY = enemies[i].coords.y;
        if(pacman.coords.x === enemyX && pacman.coords.y === enemyY) {
            pacman.crashed();
            break;
        }
    }
};

var updateCoinsNum = function() {
    $('#coinsLeft span').text(totalCoins);
};

// hotkeys
var hotkeys = function() {
    $(document).on('keydown.pacman', 'body', keydownHandler);
    $(document).on('keyup.pacman', 'body', keyupHandler);

    function keydownHandler(e) {
        keysDown[e.keyCode] = true;
    }
    function keyupHandler(e) {
        delete keysDown[e.keyCode];
    }
};

var bindings = function() {

    $('#startGame').click(btnStartClickHandler);
    $('#pauseGame').click(btnPauseClickHandler);

    hotkeys();

    function btnStartClickHandler() {
        menu.gameStart();

        stopGame();
        initMap();
        initEnemies(7);
        pacman.birth();
        pacman.redraw();
        setCustomInterval.pacman();
        setCustomInterval.crashCheck();
    }

    function btnPauseClickHandler() {
        var $self = $(this);

        if($self.hasClass('continue')) {
            continueGame();
            $self.text('Pause');
        }
        else {
            stopGame();
            $self.text('Continue');
        }
        
        $self.toggleClass('continue');
    }
};

setCustomInterval = {
    pacman: function() {
        pacmanInterval = setInterval(pacman.update, 1); // Execute as fast as possible
    },
    crashCheck: function() {
        crashInterval = setInterval(checkCrash, 10);
    },
    enemies: function() {
        enemiesInterval = setInterval(moveEnemies, 300);
    }
};

// =================================================
// Document ready function
// =================================================
$(function() {
    $field = $('#field');
    $pacman = $('#pacman');
    bindings();
    initMap();
});
