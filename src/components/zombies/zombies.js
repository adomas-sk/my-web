import * as Phaser from 'phaser';

import Arena from './arena';
import Player from './player';

export default () => {
    const scene = new Phaser.Scene('zombies');
    
    let graphics;
    let arena;
    scene.preload = function() {
        graphics = scene.add.graphics({
            lineStyle: { width: 2, color: 0xff0000 },
            fillStyle: { color: 0x5555ff },
        });
        this.load.image('shooter', '/sprites/zombies/shooter.png');
        this.load.image('zombie', '/sprites/zombies/zombie.png');
    }
    
    scene.create = function() {
        const player = new Player(scene, scene.game.canvas.width / 2, scene.game.canvas.height / 2, 'shooter', graphics);
        this.add.existing(player);
        arena = new Arena(scene, player, graphics);
    }
    
    scene.update = function(time, delta) {
        graphics.clear();
        arena.run(time, delta);
    }
    return scene
}
