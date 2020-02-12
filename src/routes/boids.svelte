<script>
  import { onMount } from "svelte";
  import * as Victor from "victor";

  let canvas;
  let PIXI;

  class Boid {
    constructor(x, y, app) {
      this.app = app;
      this.graphic = new PIXI.Graphics();

      this.graphic.setTransform(x, y);

      this.graphic.beginFill(0x8eb3ed, 1);
      this.graphic.lineTo(5, -20);
      this.graphic.lineTo(10, 0);
      this.graphic.lineTo(0, 0);
      this.graphic.endFill();

      this.velocity = new Victor(0, 0);
      this.position = new Victor(x, y);

      this.run = boids => {
        const v1 = this.cohesion(boids);
        // const v2 = this.separation(boids);
        // const v3 = this.rule3(boids);

        this.velocity = this.velocity.clone().add(v1);
        // .add(v2)
        // .add(v3);
        this.position = this.position.clone().add(this.velocity);

        if (this.position.x > app.renderer.width) {
          this.position.x = 0 + 5;
        }
        if (this.position.x < 0) {
          this.position.x = app.renderer.width -5;
        }
        if (this.position.y > app.renderer.height) {
          this.position.y = 0 + 5;
        }
        if (this.position.y < 0) {
          this.position.y = app.renderer.height - 5;
        }
        this.graphic.setTransform(this.position.x, this.position.y);
      };

      this.cohesion = boids => {
        const centre = boids.reduce((acc, b) => {
          if (b === this) {
            return acc;
          }
          if (acc === null) {
            return b.position.clone();
          } else {
            return acc.add(b.position);
          }
        }, null);
        const centreOfMass = centre.divide(
          new Victor(boids.length - 1, boids.length - 1)
        );
        return centreOfMass.subtract(this.position).divide(new Victor(100, 100));
      };

      // this.separation = (boids) => {
      //   const
      // }
    }
  }

  onMount(async () => {
    PIXI = await import("pixi.js");
    const app = new PIXI.Application({
      view: canvas,
      antialias: false,
      transparent: true
    });

    const loader = new PIXI.Loader();

    // const calculateDistance = (boidA, boidB) => {
    //   const distance = Math.sqrt(
    //     (boidB.x - boidA.x) * (boidB.x - boidA.x) +
    //       (boidB.y - boidA.y) * (boidB.y - boidA.y)
    //   );
    //   return distance;
    // };

    // const createBoid = (x, y) => {
    //   const graphic = new PIXI.Graphics();

    //   graphic.setTransform(x, y);

    //   graphic.beginFill(0x8eb3ed, 1);
    //   graphic.lineTo(5,- 20);
    //   graphic.lineTo(10, 0);
    //   graphic.lineTo(0, 0);
    //   graphic.endFill();

    //   const boidObject = {
    //     graphic,
    //     acceleration: new Victor(0, 0),
    //     velocity: new Victor(0, 0).randomizeX(-1, 1).randomizeY(-1, 1),
    //     r: 3.0,
    //     maxSpeed: 3,
    //     maxForce: 0.05,

    //     run: (otherBoids) => {
    //       const desiredSeparation = 25.0;
    //       const steer = new Victor(0, 0);
    //       otherBoids.forEach((boid) => {

    //       });
    //     }
    //   };
    //   return boidObject;
    // };

    const boidStartLocations = [
      { x: 50, y: app.renderer.height / 2 },
      { x: 75, y: app.renderer.height / 2 }
    ];

    loader.load((loader, resources) => {
      const boids = boidStartLocations.map(boid => {
        const newBoid = new Boid(boid.x, boid.y, app);
        // const newBoid = createBoid(boid.x, boid.y);
        app.stage.addChild(newBoid.graphic);
        return newBoid;
      });

      // let tick = 0;
      app.ticker.add(() => {
        // tick += 0.05;

        boids.forEach((boid, index) => {
          boid.run(boids);
        });
      });
    });
  });
</script>

<style>
  .canvasContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
  }

  canvas {
    border: 1px solid lightblue;
  }
</style>

<div class="canvasContainer">
  <canvas bind:this={canvas} width="600" height="400" />
</div>
