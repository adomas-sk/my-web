import * as Phaser from 'phaser';

import Boid from './boid';
const getScene = () => {
	const scene = new Phaser.Scene('boids');
	
	let graphics;
	
	scene.preload = function() {
		graphics = scene.add.graphics({
			lineStyle: { width: 2, color: 0xff0000 },
			fillStyle: { color: 0x5555ff },
		});
	};
	
	const flock = [];
	
	scene.create = function() {
		[...Array(100).keys()].forEach(() => {
		const position = new Phaser.Math.Vector2(Phaser.Math.Between(0, scene.game.canvas.width), Phaser.Math.Between(0, scene.game.canvas.height));
			flock.push(new Boid(position, graphics));
		});
	};
	
	scene.update = function() {
	  graphics.clear();
	  flock.forEach(boid => {
		boid.run(flock);
		});
		flock.forEach(boid => {
			boid.update();
			boid.show();
		});
	};

	return scene;
}

export default getScene;
