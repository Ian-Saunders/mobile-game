class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.delete = false;
    }
    update(deltaTime){
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        if (this.x < 0 - this.width) {
            this.delete = true;
            //if (!this.game.gameOver) this.game.score++;
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

export class FlyingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.ground = this.game.ground;
        this.width = 60;
        this.height = 44;
        this.x = game.canvas_width + 50;
        this.y = Math.random() * (game.canvas_height/2) +150;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame =5;
        this.img = document.getElementById('enemy_fly');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.ground = this.game.ground;
        this.width = 60;
        this.height = 44;
        this.x = 200;
        this.y = 200;
        this.speedX = 2;
        this.speedY = 2;
        this.maxFrame =5;
        this.img = document.getElementById('enemy_plant');
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.ground = this.game.ground;
        this.width = 60;
        this.height = 44;
        this.x = 200;
        this.y = 200;
        this.speedX = 2;
        this.speedY = 2;
        this.maxFrame =5;
        this.img = document.getElementById('enemy_spider');
    }
}