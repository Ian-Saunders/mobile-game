export default class InputHandler {
    constructor(game){
        this.game = game;
        this.lastKey = '';
        this.keys = [];
        this.touchY = '';
        this.touchThreshold = 30;
        window.addEventListener('keydown', (e) => {
            switch(e.key){
                case "ArrowLeft":
                    if (this.keys.indexOf(e.key) === -1) this.keys.push('ArrowLeft');
                    break;
                case "ArrowRight":
                    if (this.keys.indexOf(e.key) === -1) this.keys.push('ArrowRight');
                    break;
                case "ArrowUp":
                    if (this.keys.indexOf(e.key) === -1) this.keys.push('ArrowUp');
                    break;
                case "ArrowDown":
                    if (this.keys.indexOf(e.key) === -1) this.keys.push('ArrowDown');
                    if (this.game.gameOver) this.game.restart = true;
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch(e.key){
                case "ArrowLeft":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
            }
            switch(e.key){
                case "ArrowRight":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
            }
            switch(e.key){
                case "ArrowUp":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
            }
            switch(e.key){
                case "ArrowDown":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
            }
        });
        window.addEventListener('touchstart', (e) => {
            this.touchY = e.changedTouches[0].pageY;
        });
        window.addEventListener('touchmove', (e) => {
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;
            console.log('xxxswipe down- '+this.keys.indexOf('Swipe Down'));
            if (swipeDistance < -this.touchThreshold && this.keys.indexOf('Swipe Up') === -1) {
               if (this.keys.indexOf('Swipe Up') === -1) this.keys.push('Swipe Up');
            } else if (swipeDistance > this.touchThreshold && this.keys.indexOf('Swipe Down') === -1) {
               if (this.keys.indexOf('Swipe Down') === -1) this.keys.push('Swipe Down');
               if (game.gameOver) game.restart = true;
            }
        });
        window.addEventListener('touchend', (e) => {
            this.keys.splice(this.keys.indexOf('Swipe Up'), 1);
            this.keys.splice(this.keys.indexOf('Swipe Down'), 1);
        });
    }
}

