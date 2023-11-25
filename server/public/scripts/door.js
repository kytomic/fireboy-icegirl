const Door = function(ctx, x, y, color) {

    const sequences = {
        original: {x: 0, y:  0, width: 54, height: 79, count: 1},
        arrived: {x: 54, y:  0, width: 54, height: 79, count: 1}
    };

    const sprite = Sprite(ctx, x, y);

    if (color == 'red') {
        sprite.setSequence(sequences['original'])
              .useSheet("../media/red_door.png");
    }else if (color == 'blue') {
        sprite.setSequence(sequences['original'])
              .useSheet("../media/blue_door.png");
    }

    const arrivedEffect = function() {
        sprite.setSequence(sequences['arrived']);
    }

    const closedEffect = function() {
        sprite.setSequence(sequences['original']);
    }

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
        arrivedEffect: arrivedEffect,
        closedEffect: closedEffect
    };
};
