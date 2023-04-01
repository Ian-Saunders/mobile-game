export default class Enemy {
    constructor(game){
        this.game = game;
        this.width = 160;
        this.height = 119;
        this.img = document.getElementById('enemyImage');
        this.x = this.game.width + 100;
        this.ground = this.game.height - 100 - 168;
        this.y = this.ground;
        this.frameX = 0;
        this.speed = 8;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.delete = false;
        this.widthOffset = 2.2;
        this.heightOffset = 1.6;
        this.sizeOffset = 2;
    }
    update(deltaTime){
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
            this.delete = true;
            if (!this.game.gameOver) this.game.score++;
        }
    }
    draw(context){
        if (this.game.debug) {
            context.strokeStyle = 'red';
            context.beginPath();
            context.arc(this.x + this.width / this.widthOffset, this.y + this.height / this.heightOffset, this.width / this.sizeOffset, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.img, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}