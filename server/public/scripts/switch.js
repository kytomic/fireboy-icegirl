const Switch = function(ctx, x, y, color) {

    const sequences = {
        x: 0, y:  0, width: 43, height: 30, count: 2
    };

    const sprite = Sprite(ctx, x, y);

    if (color == 'red') {
        sprite.setSequence(sequences)
              .setShadowScale({ x: 0, y: 0 })
              .useSheet("../media/red_switch.png");
    }else if (color == 'blue') {
        sprite.setSequence(sequences)
              .setShadowScale({ x: 0, y: 0 })
              .useSheet("../media/blue_switch.png");
    }

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
    };
};
