import { Standing, Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './state.js';
import { collisionAnimation } from './collisions.js';

export default class Player {
    constructor(game){
        this.game = game;
        this.states = [new Standing(this.game), new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.currentState = this.states[0];
        this.img = document.getElementById('playerImage');
        this.width = 100;
        this.height = 91.3;
        this.scrWidth = 200;
        this.scrHeight = 180;
        this.x = 30;
        this.y = this.game.ground;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 1;
        this.maxFrame = 6;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.widthOffset = 1.8;
        this.sizeOffset = 2.9;
        this.heightOffset = 1.6;
        this.lives = 9;
        this.energy = 0;
    }
    init(){
        this.x = 30;
        this.y = this.game.ground;
        this.frameY = 0;
        this.frameX = 0;
        this.lives = 9;
        this.energy = 0;
        this.currentState = this.states[0];
        this.speed = 0;
        this.frameTimer = 0;
        this.restart = false;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
        console.log(this.currentState);
        console.table(this.game.input.keys);
    }
    checkCollisions(){
        // collision detection
        this.game.enemies.forEach(enemy => {
            const dx = (enemy.x + enemy.width / 2) - (this.x + this.scrWidth / this.widthOffset);
            const dy = (enemy.y + enemy.height / 2) - (this.y + this.scrHeight / this.heightOffset);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (enemy.width / 2) + (this.scrWidth / this.sizeOffset)){
                this.game.collisions.push(new collisionAnimation(this.game, enemy.x + enemy.width/2, enemy.y+enemy.height/2));
                enemy.delete = true;
                if (this.currentState === this.states[5] || this.currentState === this.states[6]){
                    this.game.score++;
                } else {   
                    this.setState(7, 0);                
                    this.lives--;
                    if (this.lives <= 0) {
                        this.game.gameOver = true;
                    }
                }
            }
        });
    }
    update(){
        // collisions
        if (!this.game.gameOver) this.checkCollisions();
        this.currentState.handleInput(this.game.input);
        // sprite animation
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX =0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }
        // controls
        // horizontal movement
        this.x += this.speed;
        if ((this.game.input.keys.includes('ArrowLeft') || this.game.input.keys.includes('Swipe Left')) && this.currentState != this.states[7]) {
            this.speed = -this.maxSpeed;
        } else if ((this.game.input.keys.includes('ArrowRight') || this.game.input.keys.includes('Swipe Right')) && this.currentState != this.states[7]) {
            this.speed = this.maxSpeed;
        } else {
            this.speed = 0;
        }
        if (this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.scrWidth) this.x = this.game.width - this.scrWidth;
        // vertical movement
        this.y += this.vy;
         if (!this.onGround()) {
             this.vy += this.weight;
         } else {
             this.vy = 0;
         }
         if (this.y > this.game.ground){
             this.y = this.game.ground;
         };
    }
    onGround(){
        return this.y >= this.game.ground;
    }
    draw(context){
        if (this.game.debug) {
            context.strokeStyle = 'blue';
            context.beginPath();
            context.arc(this.x + 200 / this.widthOffset, this.y + 180 / this.heightOffset, 200 / this.sizeOffset, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.scrWidth, this.scrHeight);
    }
}