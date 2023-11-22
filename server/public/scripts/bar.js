const Bar = function(ctx, x, y, color) {

    const sequences = {
        x: 0, y:  0, width: 178, height: 23
    };

    const sprite = Sprite(ctx, x, y);

    if (color == 'red') {
        sprite.setSequence(sequences)
              .setScale(0.68)
              .useSheet("../media/red_bar.png");
    }else if (color == 'blue') {
        sprite.setSequence(sequences)
              .setScale(0.68)
              .useSheet("../media/blue_bar.png");
    }

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
    };
};
