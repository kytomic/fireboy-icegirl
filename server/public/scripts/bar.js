const Bar = function(ctx, x, y, color) {

    const sequences = {
        original: {x: 0, y:  0, width: 178, height: 23, count: 1, loop: false},
        moving: {x: 0, y: 0, width: 178, height: 23, count: 5, timing: 100, loop: false}
    };

    const sprite = Sprite(ctx, x, y);

    if (color == 'red') {
        sprite.setSequence(sequences['original'])
              .setScale(0.68)
              .useSheet("../media/red_bar2.png");
    }else if (color == 'blue') {
        sprite.setSequence(sequences['original'])
              .setScale(0.68)
              .useSheet("../media/blue_bar2.png");
    }

    const move = function(movingBoxes) {
        // sprite.setSequence(sequences['moving']);
        sprite.setXY(1245, 700); // Temporarily hide the sprite
        if (color == 'red') {
            movingBoxes.push(BoundingBox(ctx, 228, 25, 360, 120));
        } else if (color == 'blue') {
            movingBoxes.push(BoundingBox(ctx, 135, 450, 280, 560));
        }
        return movingBoxes;
    }
    
    const update = function() {

    }

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
        move: move
    };
};
