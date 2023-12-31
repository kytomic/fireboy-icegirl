// This function defines the Player module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the player
// - `y` - The initial y position of the player
// - `gameArea` - The bounding box of the game area
const Player = function(ctx, x, y, boxes, playerNum, cheat_mode) {

    // This is the sprite sequences of the player facing different directions.
    // It contains the idling sprite sequences `idleLeft`, `idleUp`, `idleRight` and `idleDown`,
    // and the moving sprite sequences `moveLeft`, `moveUp`, `moveRight` and `moveDown`.
    const sequences = {
        /* Idling sprite sequences for facing different directions */
        idleLeft:  { x: 0, y: 26, width: 17, height: 26, count: 1, timing: 2000, loop: false },
        idleRight: { x: 0, y: 0, width: 17, height: 26, count: 1, timing: 2000, loop: false },

        /* Moving sprite sequences for facing different directions */
        moveLeft:  { x: 0, y: 26, width: 17, height: 26, count: 2, timing: 50, loop: true },
        moveRight: { x: 0, y: 0, width: 17, height: 26, count: 2, timing: 50, loop: true },
    };

    // This is the sprite object of the player created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the player sprite here.
    sprite.setScale(1.5)
          .setShadowScale({ x: 0.75, y: 0.20 });

    if (playerNum == 1) {
        sprite.useSheet("../media/fireboy.png")
              .setSequence(sequences.idleLeft);
    }else{
        sprite.useSheet("../media/icegirl.png")
              .setSequence(sequences.idleRight);
    }

    // This is the moving direction, which can be a number from 0 to 4:
    // - `0` - not moving
    // - `1` - moving to the left
    // - `2` - moving up
    // - `3` - moving to the right
    // - `4` - moving down
    let direction = 0;

    // This is the moving speed (pixels per second) of the player
    let speed = 75;
    if (cheat_mode) {
        speed = 125;
    }

    // This function sets the player's moving direction.
    // - `dir` - the moving direction (1: Left, 2: Up, 3: Right, 4: Down)
    const move = function(dir) {
        if (dir >= 1 && dir <= 4 && dir != direction) {
            switch (dir) {
                case 1: sprite.setSequence(sequences.moveLeft); break;
                case 3: sprite.setSequence(sequences.moveRight); break;
            }
            direction = dir;
        }
    };

    // This function stops the player from moving.
    // - `dir` - the moving direction when the player is stopped (1: Left, 2: Up, 3: Right, 4: Down)
    const stop = function(dir) {
        if (direction == dir) {
            switch (dir) {
                case 1: sprite.setSequence(sequences.idleLeft); break;
                case 3: sprite.setSequence(sequences.idleRight); break;
            }
            direction = 0;
        }
    };

    // Jumping logic
    let is_jumping = false;
    let jumping_speed = 300;
    let falling_speed = 5;
    let movingBoxes = boxes;

    const setJumping = function(value) {
        is_jumping = value;
    }

    const getJumping = function() {
        return is_jumping;
    }

    const setMovingBoxes = function(newBoxes) {
        movingBoxes = newBoxes;
    }

    const jump = function (socket, playerNum) {
        let { x, y } = sprite.getXY();
        let valid_move = false;
        let lowest_bottom = 9999;

        box = null;
        movingBoxes.forEach(movingBox => {
            if (movingBox.isPointInBox(x, y)) {
                valid_move = true;
                box = movingBox;
                if (movingBox.getBottom() < lowest_bottom) {
                    lowest_bottom = movingBox.getBottom();
                }
            }
        });
        
        next_y = y - jumping_speed / 40;
        if (next_y < lowest_bottom && box.isPointInBox(x, next_y)) {
            y = next_y;
            jumping_speed -= 10;
        }else{
            jumping_speed = 300;
            y = lowest_bottom;
            setJumping(false);
        }
        
        if (valid_move) {
            sprite.setXY(x, y);
            let coordinates = {x: x, y: y};
            socket.emit('player jump', coordinates);
        }
    };

    const fall = function(socket, playerNum) {
        let { x, y } = sprite.getXY();
        let lowest_bottom = 9999;

        movingBoxes.forEach(movingBox => {
            if (movingBox.isPointInBox(x, y)) {
                box = movingBox;
                if (movingBox.getBottom() < lowest_bottom) {
                    lowest_bottom = movingBox.getBottom();
                }
            }
        });

        next_y = y + falling_speed / 20;
        if (next_y < lowest_bottom) {
            y = next_y;
            falling_speed += 1;
        }else{
            falling_speed = 5;
            y = lowest_bottom;
        }
        
        sprite.setXY(x, y);
        let coordinates = {x: x, y: y};
        socket.emit('player fall', coordinates);
    }


    const update = function(time) {
        /* Update the player if the player is moving */
        if (direction != 0) {
            let { x, y } = sprite.getXY();

            /* Move the player */
            switch (direction) {
                case 1: x -= speed / 60; break;
                case 2: y -= speed / 60; break;
                case 3: x += speed / 60; break;
                case 4: y += speed / 60; break;
            }

            let valid_move = false;
            movingBoxes.forEach(movingBox => {
                if (movingBox.isPointInBox(x, y)) {
                    valid_move = true;
                }
            });
            
            /* Set the new position if it is within the game area */
            if (valid_move)
                sprite.setXY(x, y);
        }

        sprite.update(time);
    };

    let collected_coin = 0;

    const coinIncrement = function() {
        collected_coin++;
    };

    const getCollectedCoin = function() {
        return collected_coin;
    }

    const getSpeed = function() {
        console.log('Speed: ', speed);
        return speed;
    }

    return {
        move: move,
        stop: stop,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: update,
        jump: jump,
        fall: fall,
        setMovingBoxes: setMovingBoxes,
        getJumping: getJumping,
        setJumping: setJumping,
        coinIncrement: coinIncrement,
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getCollectedCoin: getCollectedCoin,
        getSpeed: getSpeed
    };
};
