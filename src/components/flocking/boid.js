import * as Phaser from 'phaser';

const { Vector2 } = Phaser.Math;

const divideByScalar = (vector, scalar) => {
	vector.set(vector.x / scalar, vector.y / scalar);
	return vector;
};

const multiplyByScalar = (vector, scalar) => {
	vector.set(vector.x * scalar, vector.y * scalar);
	return vector;
};

const setMagnitute = (vector, magnitute) => {
	return multiplyByScalar(vector.normalize(), magnitute);
};

const limit = (vector, max) => {
	const { x, y } = vector;
	const magnituteSquare = Math.sqrt(x * x + y * y);

	if (magnituteSquare > max * max) {
		return multiplyByScalar(
			divideByScalar(vector, Math.sqrt(magnituteSquare)),
			max
		);
	}
	return vector;
};

const MAX_FORCE = 0.01;
const MAX_SPEED = 8;
class Boid {
	constructor(initPosition, graphics) {
		this.position = new Vector2(initPosition.x, initPosition.y);
		this.velocity = Phaser.Math.RandomXY(new Vector2());
		this.acceleration = new Vector2();
		this.graphics = graphics;
	}

	separate = boids => {
		const perceptionRadius = 100;
		const steer = new Vector2();
		let total = 0;

		boids.forEach(boid => {
			const distance = this.position.distance(boid.position);
			if (boid !== this && distance < perceptionRadius && distance > 0) {
				const difference = new Vector2()
					.copy(this.position)
					.subtract(boid.position);
				divideByScalar(difference, distance);
				steer.add(difference);
				total += 1;
			}
		});

		if (total > 0) {
			divideByScalar(steer, total);
			setMagnitute(steer, MAX_SPEED);
			steer.subtract(this.velocity);
			limit(steer, MAX_FORCE);
		}
		return steer;
	};

	cohesion = boids => {
		const perceptionRadius = 100;
		const steer = new Vector2();
		let total = 0;
		boids.forEach(boid => {
			const distance = this.position.distance(boid.position);
			if (boid !== this && distance < perceptionRadius && distance > 0) {
				steer.add(boid.position);
				total += 1;
			}
		});
		if (total > 0) {
			divideByScalar(steer, total);
			steer.subtract(this.position);
			setMagnitute(steer, MAX_SPEED);
			steer.subtract(this.velocity);
			limit(steer, MAX_FORCE);
		}
		return steer;
	};

	align = boids => {
		const perceptionRadius = 100;
		const steer = new Vector2();
		let total = 0;
		boids.forEach(boid => {
			const distance = this.position.distance(boid.position);
			if (boid !== this && distance < perceptionRadius && distance > 0) {
				steer.add(boid.velocity);
				total += 1;
			}
		});
		if (total > 0) {
			divideByScalar(steer, total);
			setMagnitute(steer, MAX_SPEED);
			steer.subtract(this.velocity);
			limit(steer, MAX_FORCE);
		}
		return steer;
	};

	run = boids => {
		this.acceleration = new Vector2();

		const alignment = this.align(boids);
		const cohesion = this.cohesion(boids);
		const separation = this.separate(boids);

		multiplyByScalar(alignment, 1);
		multiplyByScalar(cohesion, 1);
		multiplyByScalar(separation, 1.1);

		this.acceleration
			.add(cohesion)
			.add(alignment)
			.add(separation);
	};

	update = () => {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		limit(this.velocity, MAX_SPEED);
	};

	show = () => {
		const { x, y } = this.position;
		const canvasHeight = this.graphics.scene.game.canvas.height;
		const canvasWidth = this.graphics.scene.game.canvas.width;
		if (x > canvasWidth) {
			this.position.x = 0;
		} else if (x < 0) {
			this.position.x = canvasWidth;
		}
		if (y > canvasHeight) {
			this.position.y = 0;
		} else if (y < 0) {
			this.position.y = canvasHeight;
		}

		const direction = vector => {
			return Math.atan2(vector.y, vector.x);
		};

		const angle = direction(this.velocity) + Phaser.Math.DegToRad(90);

		const pointA = Phaser.Math.Rotate(new Phaser.Geom.Point(0, -15), angle);
		const pointB = Phaser.Math.Rotate(new Phaser.Geom.Point(-10, +15), angle);
		const pointC = Phaser.Math.Rotate(new Phaser.Geom.Point(+10, +15), angle);

		const triangleShape = new Phaser.Geom.Triangle(
			x + pointA.x,
			y + pointA.y,
			x + pointB.x,
			y + pointB.y,
			x + pointC.x,
			y + pointC.y
		);
		this.graphics.fillTriangleShape(triangleShape);
	};
}

export default Boid;
