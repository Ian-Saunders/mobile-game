class Particle {
    constructor(game){
        this.game = game;
        this.delete = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if (this.size < 0.3) this.delete = true;
    }
}

export class Dust extends Particle {
    constructor(game, x ,y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y =y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.colour = 'rgba(0,0,0,0.2)';
    }
    draw(context){
        context.fillStyle = this.colour;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0 , Math.PI * 2);
        context.fill();
    }
}

export class Splash extends Particle {
    constructor(game, x ,y){
        super(game);
        this.img = document.getElementById('fire');
        this.size =Math.random() * 100 + 100;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 12 - 6;
        this.speedY = Math.random() * 2 + 1;
        this.gravity = 0;
    }
    update(){
        super.update();
        this.gravity += 0.05;
        this.y += this.gravity;
    }
    draw(context){
        context.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {
    constructor(game, x ,y){
        super(game);
        this.img = document.getElementById('fire');
        this.size =Math.random() * 100 + 50;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 + 0.1;
    }
    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sign(this.angle * 10);
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.img, -this.size*0.5, -this.size*0.5, this.size, this.size);

        context.restore();
    }
}