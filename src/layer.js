export class Layer {
    constructor(image, speedModifier, game){
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = this.game.gameSpeed * this.speedModifier;
    }
    init(){
        this.x = 0;
    }
    update(){
        this.speed = this.game.gameSpeed * this.speedModifier;
        this.x = this.game.gameFrame * this.speed % this.width;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.game.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.game.height);
    }
}

export let backgroundLayer1 = document.getElementById('backgroundLayer1');
export let backgroundLayer2 = document.getElementById('backgroundLayer2');
export let backgroundLayer3 = document.getElementById('backgroundLayer3');
export let backgroundLayer4 = document.getElementById('backgroundLayer4');
export let backgroundLayer5 = document.getElementById('backgroundLayer5');