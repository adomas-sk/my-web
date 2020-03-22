import * as Phaser from 'phaser';

import { multiplyByScalar } from '../vector.utils';

const { Vector2 } = Phaser.Math;

const BULLET_SPEED = 10;
const BULLET_SIZE = 5
class Bullet {
    constructor(x, y, target, graphics) {
        this.position = new Vector2(x, y);
        this.target = target;
        this.direction = multiplyByScalar(target.clone().subtract(this.position).normalize(), BULLET_SPEED);
        this.graphics = graphics;
        this.active = true;
    }

    render = () => {
        this.graphics.fillStyle(0xcf1908, 1.0);
        this.graphics.fillCircle(this.position.x, this.position.y, BULLET_SIZE);
    }

    move = () => {
        if (this.position.x < 0 || this.position.y < 0 || this.position.x > this.graphics.scene.game.canvas.width || this.position.y > this.graphics.scene.game.canvas.height) {
            this.active = false;
        }
        this.position.add(this.direction);
    }

    run = () => {
        if (this.active) {
            this.move();
            this.render();
        }
    }
}

export default Bullet;
