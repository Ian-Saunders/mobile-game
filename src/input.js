export default class InputHandler {
    constructor(game){
        this.game = game;
        this.lastKey = '';
        this.keys = [];
        this.touchY = '';
        this.touchX = '';
        this.mouseX = 0;
        this.mouseY = 0;
        this.touchDown1 = false;
        this.touchThreshold = 30;
        window.addEventListener('keydown', (e) => {
            switch(e.key){
                case "ArrowLeft":
                    if (this.keys.indexOf(e.key)) this.keys.push('ArrowLeft');
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
                case "Enter":
                    if (this.keys.indexOf(e.key) === -1) this.keys.push('Enter');
                    break;
            }
            if(e.key === 'd') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', (e) => {
            switch(e.key){
                case "ArrowLeft":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
                case "ArrowRight":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
                case "ArrowUp":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
                case "ArrowDown":
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    break;
                case "Enter":
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                    break;
            }
        });
        window.addEventListener('touchstart', (e) => {
            this.keys.push('Pointer Down');
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
                if (this.game.gameOver) {
                    this.game.restart = true;
                }
            }
            if (swipeXDistance < -this.touchThreshold && this.keys.indexOf('Swipe Left') === -1) {
                this.keys.push('Swipe Left');
            } else if (swipeXDistance > this.touchThreshold && this.keys.indexOf('Swipe Right') === -1) {
                this.keys.push('Swipe Right');
            }
            this.mouseY = e.changedTouches[0].pageY;
            this.mouseX = e.changedTouches[0].pageX;
        });
        window.addEventListener('touchend', (e)=> {
            e.preventDefault();
            this.keys = [];
        });
    }
}

