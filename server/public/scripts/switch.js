const Switch = function(ctx, x, y, color) {

    const sequences = {
        original: {x: 0, y:  0, width: 43, height: 30, count: 1},
        triggerred: {x: 44, y:  0, width: 43, height: 30, count: 1},
    };

    const sprite = Sprite(ctx, x, y);

    if (color == 'red') {
        sprite.setSequence(sequences['original'])
              .setShadowScale({ x: 0, y: 0 })
              .useSheet("../media/red_switch.png");
    }else if (color == 'blue') {
        sprite.setSequence(sequences['original'])
              .setShadowScale({ x: 0, y: 0 })
              .useSheet("../media/blue_switch.png");
    }

    let is_triggered = false;
    const getTriggerState = function() {
        return is_triggered;
    }

    const checkTrigger = function(player) {
        const switchBox = sprite.getBoundingBox();
        if (switchBox.intersect(player.getBoundingBox()) && sprite.getXY().y > player.getXY().y) {
            is_triggered = true;
            sprite.setSequence(sequences['triggerred']);
            return true;
        }
        return false;
    }

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
        getTriggerState: getTriggerState,
        checkTrigger: checkTrigger
    };
};
