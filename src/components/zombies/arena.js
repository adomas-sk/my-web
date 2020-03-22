import Zombie from './zombie';

const STAGE_DURATION = 1000 * 20;
const stageConfig = [
    {
        zombieEvery: 2 * 1000,
    },
    {
        zombieEvery: 2 * 1000,
    },
    {
        zombieEvery: 1 * 1000,
    },
    {
        zombieEvery: 1 * 1000,
    },
];

class Arena {
    constructor(scene, player, graphics) {
        this.player = player;
        this.zombies = [];
        this.scene = scene;
        this.graphics = graphics

        this.currentStage = 0;
        this.timeSinceLastZombie = 0;
    }

    runStage = (time, delta) => {
        const stage = stageConfig[this.currentStage] || {zombieEvery: 2 * 1000};
        if (time < STAGE_DURATION * this.currentStage) {
            if (this.timeSinceLastZombie > stage.zombieEvery) {
                this.spawnZombie();
                this.timeSinceLastZombie = 0;
            } else {
                this.timeSinceLastZombie += delta;
            }
        } else {
            this.currentStage += 1;
        }
    }

    spawnZombie = () => {
        const height = this.scene.game.canvas.height;
        const width = this.scene.game.canvas.width;

        let spawnX;
        let spawnY;

        const shouldSpawnFromHorizontalSides = Phaser.Math.Between(0, 1);

        if (shouldSpawnFromHorizontalSides) {
            const shouldSpawnFromRight = Phaser.Math.Between(0, 1);
            if (shouldSpawnFromRight) {
                spawnX = width;
            } else {
                spawnX = 0;
            }
            spawnY = Phaser.Math.Between(0, height);
        } else {
            const shouldSpawnFromBottom = Phaser.Math.Between(0, 1);
            if (shouldSpawnFromBottom) {
                spawnY = height;
            } else {
                spawnY = 0;
            }
            spawnX = Phaser.Math.Between(0, width);
        }

        const zombie = new Zombie(this.scene, spawnX, spawnY, 'zombie', this.graphics);
        this.scene.add.existing(zombie);
        this.zombies.push(zombie);
    }

    run(time, delta) {
        if (this.player.health < 1) {
            return;
        }
        this.player.run();
        this.runStage(time, delta);
        this.zombies = this.zombies.reduce((hoard, zombie) => {
            if (zombie.dead) {
                zombie.destroy();
            } else {
                if (zombie.position.distance(this.player.position) < this.player.height / 2 + zombie.height / 2) {
                    this.player.hit(zombie);
                }
                zombie.run(this.player);
                hoard.push(zombie);
            }
            return hoard;
        }, []);
    }
}

export default Arena;