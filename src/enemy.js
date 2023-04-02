class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.delete = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.x < 0 - this.width) {
            this.delete = true;
            //if (!this.game.gameOver) this.game.score++;
        }
    }
    draw(context){
        if (this.game.debug) {
            context.strokeStyle = 'red';
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
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
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(){
        super.update();
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.ground = this.game.ground + this.height +4;
        this.x =game.canvas_width + 50;
        this.y = this.ground;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
        this.img = document.getElementById('enemy_plant');
    }
    update(){
        super.update();
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.ground = this.game.ground;
        this.width = 120;
        this.height = 144;
        this.x = game.canvas_width + 50;
        this.y = Math.random() * this.game.canvas_height * 0.5;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
        this.img = document.getElementById('enemy_spider');
    }
    update(){
        super.update();
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }
        if (this.y > this.game.canvas_height * 0.66 || this.y < -60) this.speedY *= -1;
    }
    draw(context){
        super.draw(context);
        context.strokeStyle = 'black';
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(this.x + this.width / 2,0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();
    }
}