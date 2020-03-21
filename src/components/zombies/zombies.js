import * as Phaser from 'phaser';

import Arena from './arena';

export default () => {
    const scene = new Phaser.Scene('zombies');
    
    let graphics;
    let arena;
    scene.preload = function() {
        graphics = scene.add.graphics({
            lineStyle: { width: 2, color: 0xff0000 },
            fillStyle: { color: 0x5555ff },
        });
        arena = new Arena(graphics);
    }
    
    scene.create = function() {
    }
    
    scene.update = function() {
        graphics.clear();
        arena.run();
    }
    return scene
}

// export default scene;
