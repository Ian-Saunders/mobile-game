import Game from './src/game.js';
import { Layer, backgroundLayer1, backgroundLayer2, backgroundLayer3, backgroundLayer4, backgroundLayer5 } from './src/layer.js';

window.addEventListener("load", function(){
    const fullScreenButton = document.getElementById('fullScreenButton');
    //
    // function toggleFullScreen(){
    //     if (!doxument.fullscreenElement) {
    //         canvas.requestFullscreen().catch(err => {
    //             alert(`Error, can't enable full-screen mode: ${err.message}`);
    //         });
    //     } else {
    //         document.exitFullscreen();
    //     }
    // }
    // fullScreenButton.addEventListener('click', toggleFullScreen);
    window.lastTime =0;
    window.deltaTime = 0;

    const game = new Game(canvas.width, canvas.height);

    const layer1 = new Layer(backgroundLayer1, 0.2, game);
    const layer2 = new Layer(backgroundLayer2, 0.4, game);
    const layer3 = new Layer(backgroundLayer3, 0.6, game);
    const layer4 = new Layer(backgroundLayer4, 0.8, game);
    const layer5 = new Layer(backgroundLayer5, 1, game);
    const layers = [layer1,layer2,layer3,layer4,layer5];
    game.layers = layers;
    game.animate(0);
});
