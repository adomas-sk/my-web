import * as Phaser from 'phaser';
import { multiplyByScalar } from '../vector.utils';

const { Vector2 } = Phaser.Math;

const ZOMBIE_SPEED = 2;
const MAX_ZOMBIE_HEALTH = 10
class Zombie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, graphics) {
        super(scene, x, y, texture);
        this.position = new Vector2(x, y);
        this.health = MAX_ZOMBIE_HEALTH;
        this.dead = false;
        this.graphics = graphics;
    }

    move = (target) => {
        const direction = target.clone().subtract(this.position).normalize()
        const velocity = multiplyByScalar(direction, ZOMBIE_SPEED);
        this.position.add(velocity);
        this.x = this.position.x;
        this.y = this.position.y;

        this.rotation = direction.angle() + Phaser.Math.DegToRad(90);
    }

    checkForBulletCollision = (bullets) => {
        bullets.forEach((bullet) => {
            if (this.position.distance(bullet.position) <= this.height) {
                this.health -= 1;
                bullet.active = false;
            }
            if (this.health < 1) {
                this.dead = true;
            }
        });
    }

    showHealth = () => {
        this.graphics.fillStyle(0xd1001f, 1.0);
        this.graphics.lineStyle(2, 0x000000, 1.0);
        const HEALTH_BAR_HEIGHT = 10;
        this.graphics.fillRect(this.position.x - this.width / 2, this.position.y - this.height / 2 - HEALTH_BAR_HEIGHT, this.health / MAX_ZOMBIE_HEALTH * this.width, HEALTH_BAR_HEIGHT);
    }

    run = (player) => {
        this.showHealth();
        this.checkForBulletCollision(player.bullets);
        this.move(player.position);
    }
}

export default Zombie;
