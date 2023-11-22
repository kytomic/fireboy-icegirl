// This function defines the Gem module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the gem
// - `y` - The initial y position of the gem
// - `color` - The colour of the gem
const Coin = function(ctx, x, y) {

    // This is the sprite sequences of the gem of four colours
    // `green`, `red`, `yellow` and `purple`.
    const sequences = {
        x: 0, y:  0, width: 11, height: 24, count: 8, timing: 200, loop: true
    };

    // This is the sprite object of the gem created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the gem sprite here.
    sprite.setSequence(sequences)
          .setScale(1.5)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("../media/coin.png");

    const hide = function() {
        console.log('Hide');
        sprite.setXY(1245, 700);
    };

    // The methods are returned as an object here.
    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
        hide: hide
    };
};
