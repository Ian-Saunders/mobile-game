export default class InputHandler {
    constructor(game){
        this.game = game;
        this.lastKey = '';
        this.keys = [];
        this.touchY = '';
        this.touchX = '';
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
                    if (this.game.gameOver) {
                        this.game.restart = true;
                    }
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
            this.touchX = e.changedTouches[0].pageX;
        });
        window.addEventListener('touchmove', (e) => {
            const swipeYDistance = e.changedTouches[0].pageY - this.touchY;
            const swipeXDistance = e.changedTouches[0].pageX - this.touchX;
            if (swipeYDistance < -this.touchThreshold && this.keys.indexOf('Swipe Up') === -1) {
                this.keys.push('Swipe Up');
            } else if (swipeYDistance > this.touchThreshold && this.keys.indexOf('Swipe Down') === -1) {
                this.keys.push('Swipe Down');
                if (game.gameOver) {
                    this.game.restart = true;
                }
            }
            if (swipeXDistance < -this.touchThreshold && this.keys.indexOf('Swipe Left') === -1) {
                this.keys.push('Swipe Left');
            } else if (swipeXDistance > this.touchThreshold && this.keys.indexOf('Swipe Right') === -1) {
                this.keys.push('Swipe Right');
            }
        });
        window.addEventListener('touchend', (e) => {
            this.keys.splice(this.keys.indexOf('Swipe Up'), 1);
            this.keys.splice(this.keys.indexOf('Swipe Down'), 1);
            this.keys.splice(this.keys.indexOf('Swipe Left'), 1);
            this.keys.splice(this.keys.indexOf('Swipe Right'), 1);
        });
    }
}

