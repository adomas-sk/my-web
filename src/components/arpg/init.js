import mainScene from './scenes/main.scene';

const init = (canvas) => {
    const config = {
        canvas,
        scene: mainScene(),
        type: Phaser.WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
    };

    return new Phaser.Game(config);
};

export default init;
