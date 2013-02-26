var pacman = {

    consts: {
        DIRECTION_RIGHT: 'right',
        DIRECTION_LEFT: 'left',
        DIRECTION_UP: 'up',
        DIRECTION_DOWN: 'down'
    },

    direction: '',

    coords: {
        x: 0,
        y: 0
    },

    go2Left: function() {
        if(pacman.direction !== pacman.consts.DIRECTION_LEFT) {
            pacman.turnLeft();
            pacman.direction = pacman.consts.DIRECTION_LEFT;
        }
        pacman.move(pacman.coords.x - 1, pacman.coords.y);
    },

    go2Right: function() {
        if(pacman.direction !== pacman.consts.DIRECTION_RIGHT) {
            pacman.turnRight();
            pacman.direction = pacman.consts.DIRECTION_RIGHT;
        }
        pacman.move(pacman.coords.x + 1, pacman.coords.y);
    },

    go2Up: function() {
        if(pacman.direction !== pacman.consts.DIRECTION_UP) {
            pacman.turnUp();
            pacman.direction = pacman.consts.DIRECTION_UP;
        }
        pacman.move(pacman.coords.x, pacman.coords.y - 1);
    },

    go2Down: function() {
        if(pacman.direction !== pacman.consts.DIRECTION_DOWN) {
            pacman.turnDown();
            pacman.direction = pacman.consts.DIRECTION_DOWN;
        }
        pacman.move(pacman.coords.x, pacman.coords.y + 1);
    },

    turnRight: function() {
        $pacman.find('.body').css('-webkit-transform', 'scaleX(1)');
    },

    turnLeft: function() {
        $pacman.find('.body').css('-webkit-transform', 'scaleX(-1)');
    },

    turnDown: function() {
        $pacman.find('.body').css('-webkit-transform', 'rotate(90deg)');
    },

    turnUp: function() {
        $pacman.find('.body').css('-webkit-transform', 'rotate(270deg)');
    },

    move: function(nextX, nextY) {
        var now = Date.now(),
            delta = now - then,
            nextStepPoint,
            minInterval = 200;

        if(minInterval >= delta) {
            return;
        }

        try {
            nextStepPoint = map[nextY][nextX];
        }
        catch(err) {
            return false;
        }

        switch(nextStepPoint) {
            case COIN:
                pacman.eatThis(nextX, nextY);
                break;
            case GROUND:
                break;
            case WALL:
                return;
            default:
                return;
        }

        pacman.updateCoords(nextX, nextY);
        pacman.redraw();

        then = now;
    },

    eatThis: function(x, y) {
        
        map[y][x] = GROUND;

        totalCoins--;
        updateCoinsNum();

        setTimeout(cleanField, 100);

        function cleanField() {
            $('.point[data-pos=' + x + '_' + y + ']').css(textures[GROUND]);
        }
    },

    updateCoords: function(x, y) {
        // if try to go diagonally
        if(Math.abs(pacman.coords.x - x) && Math.abs(pacman.coords.y - y)) {
            return false;
        }
        pacman.coords = {
            x: x,
            y: y
        };
    },

    redraw: function() {
        $pacman.css({
            'transform': 'translate3d(0,0,0) translate(' + pacman.coords.x * mapPointSize.w + 'px, '+ pacman.coords.y * mapPointSize.h +'px)'
        });
    },

    crashed: function() {
        stopGame();
        pacman.died();
        
    },

    died: function() {
        $pacman.addClass('died');
        pacman.turnRight();
        menu.gameOver();
    },

    birth: function() {
        pacman.coords = level1.pacmanCoords;
        $pacman.removeClass('died').show();
        pacman.turnRight();
    },
    
    update: function () {
        var ESC_KEY_CODE = 27,
            LEFT_ARROW_KEY = 37,
            RIGHT_ARROW_KEY = 39,
            UP_ARROW_KEY = 38,
            DOWN_ARROW_KEY = 40;

        if (UP_ARROW_KEY in keysDown) { // Player holding up
            pacman.go2Up();
        }
        if (DOWN_ARROW_KEY in keysDown) { // Player holding down
            pacman.go2Down();
        }
        if (LEFT_ARROW_KEY in keysDown) { // Player holding left
            pacman.go2Left();
        }
        if (RIGHT_ARROW_KEY in keysDown) { // Player holding right
            pacman.go2Right();
        }
    }

};