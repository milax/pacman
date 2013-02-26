
// init map
var initMap = function() {

    $field.find('.point, .enemy').remove();

    map = level1.map.clone();

    mapSize = {
        h: map.length,
        w: map[0].length
    };
    mapPointSize = {
        w: level1.mapPointSize,
        h: level1.mapPointSize
    };

    drawMap();
};

// draw map
var drawMap = function() {
    var i, j;

    $field.width(mapPointSize.w * mapSize.w);
    $field.height(mapPointSize.h * mapSize.h);

    totalCoins = 0;
    for(i = 0; i < mapSize.h; i++) {
        for(j = 0; j < mapSize.w; j++) {
            var currPointTextureId = map[j][i],
                pos = {
                    'left': i * mapPointSize.w,
                    'top': j * mapPointSize.h
                };

            if(currPointTextureId === COIN) {
                totalCoins++;
            }

            var $point2Add = $('<div />', {'class': 'point', 'data-pos': i + '_' + j});
            $point2Add.css(pos);
            $point2Add.css(textures[currPointTextureId]);
            $field.append($point2Add);
        }
    }
    $('.point', $field).width(mapPointSize.w);
    $('.point', $field).height(mapPointSize.h);
    updateCoinsNum();
};