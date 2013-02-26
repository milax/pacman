var enemy = function() {

    var $monster;
    
    var ENEMY_COLORS_NUM = 4;
    var UP = 0,
        LEFT = 1,
        DOWN = 2,
        RIGHT = 3;

    var that = this;

    this.coords = {
        x: 0,
        y: 0
    };

    this.init = function() {
        setInitPosition();
        addEnemy();
    };

    var setInitPosition = function() {

        // generate random initial position
        do {
            randX = Math.getRandomNumber(mapSize.w);
            randY = Math.getRandomNumber(mapSize.h);
        } while (randY >= Math.floor(mapSize.h/2) || map[randY][randX] === WALL);

        that.coords = {
            x: randX,
            y: randY
        };
    };

    var addEnemy = function() {
        $monster = $('<div />', {'class': 'enemy'});
        
        $monster.css('background-image', 'url(gfx/enemy_0' + (Math.getRandomNumber(ENEMY_COLORS_NUM) + 1) + '.png)');
        $field.append($monster);
        redraw();
    };

    var redraw = function() {
        $monster.css({
            'transform': 'translate3d(0,0,0) translate(' + that.coords.x * mapPointSize.w + 'px, '+ that.coords.y * mapPointSize.h +'px)'
        });
    };

    this.move = function() {
        var POSSIBLE_DIRECTIONS = 4,
            isPossible = false,
            try2GoDirection,
            coords2Go = {
                x: 0,
                y: 0
            };

        while(!isPossible) {
            try2GoDirection = Math.getRandomNumber(POSSIBLE_DIRECTIONS);
            switch(try2GoDirection) {
                case UP:
                    isPossible = checkIfPossible(that.coords.x, that.coords.y - 1);
                    break;
                case DOWN:
                    isPossible = checkIfPossible(that.coords.x, that.coords.y + 1);
                    break;
                case LEFT:
                    isPossible = checkIfPossible(that.coords.x  - 1, that.coords.y);
                    break;
                case RIGHT:
                    isPossible = checkIfPossible(that.coords.x + 1, that.coords.y);
                    break;
            }
        }

        that.coords = coords2Go;

        redraw();

        function checkIfPossible(x, y) {
            coords2Go = {
                x: x,
                y: y
            };
            return (map[y] !== undefined && map[y][x] !== undefined && map[y][x] !== WALL);
        }
    };

    this.init();
};

var initEnemies = function(numberOfEnemies) {
    var i;
    for(i = 0; i < enemies.length; i++) {
        delete enemies[i];
    }
    enemies = [];
    for(i = 0; i < numberOfEnemies; i++) {
        enemies.push(new enemy());
    }
    setCustomInterval.enemies();
};

var moveEnemies = function() {
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].move();
    }
};