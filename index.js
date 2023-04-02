import Game from './src/game.js';
import { fullScreenButton, toggleFullScreen } from './src/utils.js';
window.addEventListener("load", function () {
    fullScreenButton.addEventListener('click', toggleFullScreen);
    const game = new Game(1400, 900);
    
    function animate(timeStamp) {
        game.deltaTime = timeStamp - game.lastTime;
        game.lastTime = timeStamp;
        game.update();
        game.draw();
        requestAnimationFrame(animate);
    }
    animate(0);
});