import * as Phaser from 'phaser';

export default () => {
    const scene = new Phaser.Scene('zombies');
    
    let graphics;
    scene.preload = function() {
        graphics = scene.add.graphics();
    }
    
    scene.create = function() {
    }
    
    scene.update = function() {
        const rectSize = 100;
        graphics.clear();
        graphics.fillStyle(0xFF00FF, 1.0);
        graphics.fillRect(scene.game.canvas.width / 2 - rectSize / 2, scene.game.canvas.height / 2 - rectSize / 2, rectSize, rectSize);
    }
    return scene
}
