import * as Phaser from 'phaser';

import Bullet from './bullet';

const { Vector2 } = Phaser.Math;

const upLetter = Phaser.Input.Keyboard.KeyCodes.W;
const upArrow = Phaser.Input.Keyboard.KeyCodes.UP;
const downLetter = Phaser.Input.Keyboard.KeyCodes.S;
const downArrow = Phaser.Input.Keyboard.KeyCodes.DOWN;
const leftLetter = Phaser.Input.Keyboard.KeyCodes.A;
const leftArrow = Phaser.Input.Keyboard.KeyCodes.LEFT;
const rightLetter = Phaser.Input.Keyboard.KeyCodes.D;
const rightArrow = Phaser.Input.Keyboard.KeyCodes.RIGHT;

const MOVEMENT_SPEED = 3;
const PLAYER_SIZE = 50;
class Player {
    constructor (x, y, graphics) {
        this.position = new Vector2(x, y);
        this.graphics = graphics;
        this.input = graphics.scene.input;

        this.bullets = [];
        this.justShooting = false;

        // adding movement keys
        const keyboardInput = {
            upLetter: this.input.keyboard.addKey(upLetter),
            upArrow: this.input.keyboard.addKey(upArrow),
            downLetter: this.input.keyboard.addKey(downLetter),
            downArrow: this.input.keyboard.addKey(downArrow),
            leftLetter: this.input.keyboard.addKey(leftLetter),
            leftArrow: this.input.keyboard.addKey(leftArrow),
            rightLetter: this.input.keyboard.addKey(rightLetter),
            rightArrow: this.input.keyboard.addKey(rightArrow),
        }
        this.keyboardInput = keyboardInput;
    }

    render = () => {
        this.graphics.fillStyle(0x27753c, 1.0);
        this.graphics.fillRect(this.position.x, this.position.y, PLAYER_SIZE, PLAYER_SIZE);
    }

    move = () => {
        const isUpPressed = this.keyboardInput.upLetter.isDown || this.keyboardInput.upArrow.isDown;
        const isDownPressed = this.keyboardInput.downLetter.isDown || this.keyboardInput.downArrow.isDown;
        const isLeftPressed = this.keyboardInput.leftLetter.isDown || this.keyboardInput.leftArrow.isDown;
        const isRightPressed = this.keyboardInput.rightLetter.isDown || this.keyboardInput.rightArrow.isDown;

        const velocity = new Vector2();
        if (isUpPressed) {
            velocity.y -= MOVEMENT_SPEED;
        }
        if (isDownPressed) {
            velocity.y += MOVEMENT_SPEED;
        }
        if (isLeftPressed) {
            velocity.x -= MOVEMENT_SPEED;
        }
        if (isRightPressed) {
            velocity.x += MOVEMENT_SPEED;
        }

        this.position.add(velocity);
    }

    shoot = () => {
        const mouseDown = this.input.mousePointer.isDown;
        if (mouseDown && !this.shooting) {
            const mousePosition = this.input.mousePointer.position;

            const direction = mousePosition.clone().subtract(this.position).normalize();
            const bullet = new Bullet(this.position.x + PLAYER_SIZE/2, this.position.y + PLAYER_SIZE/2, direction, this.graphics);

            this.bullets.push(bullet);
            this.shooting = true;
        } else if (!mouseDown) {
            this.shooting = false;
        }
    }

    run = () => {
        this.move();
        this.shoot();
        this.render();
        this.bullets = this.bullets.reduce((newBullets, bullet) => {
            if (!bullet.active) {
                return newBullets;
            }
            bullet.run();
            newBullets.push(bullet);
            return newBullets;
        }, []);
        
    }
}

export default Player;
