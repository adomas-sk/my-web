import Player from './player';

class Arena {
    constructor(graphics) {
        this.player = new Player(300, 300, graphics);
    }

    run() {
        this.player.run();
    }
}

export default Arena;