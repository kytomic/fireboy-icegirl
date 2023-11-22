const Door = function(ctx, x, y, color) {

    const sequences = {
        x: 0, y:  0, width: 54, height: 79, count: 2
    };

    const sprite = Sprite(ctx, x, y);

    if (color == 'red') {
        sprite.setSequence(sequences)
              .useSheet("../media/red_door.png");
    }else if (color == 'blue') {
        sprite.setSequence(sequences)
              .useSheet("../media/blue_door.png");
    }

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
    };
};
