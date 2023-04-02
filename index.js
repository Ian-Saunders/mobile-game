import Game from './src/game.js';

window.addEventListener("load", function(){
    const fullScreenButton = document.getElementById('fullScreenButton');
    
    function toggleFullScreen(){
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener('click', toggleFullScreen);
    window.lastTime =0;
    window.deltaTime = 0;
    const game = new Game(1400, 900);


    function animate(timeStamp){
        game.deltaTime = timeStamp - game.lastTime;
        game.lastTime = timeStamp;
        game.update();
        game.draw();
        requestAnimationFrame(animate);
    }
    animate(0);
});
