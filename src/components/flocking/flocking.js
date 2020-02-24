import * as Phaser from 'phaser';

import Boid from './boid';

const scene = new Phaser.Scene('boids');

let graphics;

scene.preload = function() {
	graphics = scene.add.graphics({
		lineStyle: { width: 2, color: 0xff0000 },
		fillStyle: { color: 0x5b3cc9 },
	});
};

const flock = [];

scene.create = function() {
	[...Array(50).keys()].forEach(() => {
    const position = new Phaser.Math.Vector2(Phaser.Math.Between(0, scene.game.canvas.width), Phaser.Math.Between(0, scene.game.canvas.height));
		flock.push(new Boid(position, graphics));
	});
};

scene.update = function() {
	graphics.clear();
	flock.forEach(boid => {
    boid.run(flock);
		boid.update();
		boid.show();
	});
};

export default scene;
