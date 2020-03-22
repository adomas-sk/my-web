import * as Phaser from 'phaser';

import Bullet from './bullet';
import { multiplyByScalar } from '../vector.utils';

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
const MAX_HEALTH = 20;
const KNOCKBACK_DISTANCE = 20;
class Player extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, graphics) {
        super(scene, x, y, texture);
        this.position = new Vector2(x, y);
        this.graphics = graphics;

        this.health = MAX_HEALTH;

        this.bullets = [];
        this.justShooting = false;

        // adding movement keys
        this.input = graphics.scene.input;
        this.input.setPollAlways();
        this.keyboardInput = {
            upLetter: this.input.keyboard.addKey(upLetter),
            upArrow: this.input.keyboard.addKey(upArrow),
            downLetter: this.input.keyboard.addKey(downLetter),
            downArrow: this.input.keyboard.addKey(downArrow),
            leftLetter: this.input.keyboard.addKey(leftLetter),
            leftArrow: this.input.keyboard.addKey(leftArrow),
            rightLetter: this.input.keyboard.addKey(rightLetter),
            rightArrow: this.input.keyboard.addKey(rightArrow),
        }
    }

    render = () => {
        this.x = this.position.x;
        this.y = this.position.y;

        const mousePosition = this.input.mousePointer.position;
        const direction = mousePosition.clone().subtract(this.position).normalize();
        this.rotation = direction.angle() + Phaser.Math.DegToRad(90);

        this.showHealth();
    }

    showHealth = () => {
        this.graphics.fillStyle(0x65d100, 1.0);
        this.graphics.lineStyle(2, 0x000000, 1.0);
        const HEALTH_BAR_HEIGHT = 10;
        this.graphics.fillRect(this.position.x - this.width / 2, this.position.y - this.height / 2 - HEALTH_BAR_HEIGHT, this.health / MAX_HEALTH * this.width, HEALTH_BAR_HEIGHT);
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
            const bullet = new Bullet(this.position.x, this.position.y, mousePosition, this.graphics);

            this.bullets.push(bullet);
            this.shooting = true;
        } else if (!mouseDown) {
            this.shooting = false;
        }
    }

    run = () => {
        this.move();
        this.shoot();
        this.bullets = this.bullets.reduce((newBullets, bullet) => {
            if (!bullet.active) {
                return newBullets;
            }
            bullet.run();
            newBullets.push(bullet);
            return newBullets;
        }, []);
        this.render();
    }

    hit = (zombie) => {
        const oppositeDirection = this.position.clone().subtract(zombie.position).normalize();
        const knockbackVelocity = multiplyByScalar(oppositeDirection, KNOCKBACK_DISTANCE);
        this.position.add(knockbackVelocity);
        this.health -= 1;
    }
}

export default Player;
