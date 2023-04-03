export class collisionAnimation{
    constructor(game, x, y){
        this.game = game;
        this.img = document.getElementById('collisionAnimation');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() * 4 - 2;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.frameX = 0;
        this.maxFrame = 4;
        this.delete = false;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }
    update(){
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval){
            if (this.frameX == this.maxFrame) this.delete = true;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }
    }
    draw(context){
        context.drawImage(this.img, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}