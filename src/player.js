import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from './state.js';
export default class Player {
    constructor(game){
        this.game = game;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), 
            new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)];
        this.currentState = this.states[1];
        this.img = document.getElementById('playerImage');
        //this.img = document.getElementById('dogImage');
        this.width = 573;
        this.height = 523;
        this.scrWidth = 200;
        this.scrHeight = 180;
        //this.height = 181.83;
        this.ground = this.game.height - 100 - 228;
        this.x = 30;
        this.y = this.ground;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 1;
        this.maxFrame = 6;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.widthOffset = 1.8;
        this.sizeOffset = 2.9;
        this.heightOffset = 1.6;
        this.restart = false;
    }
    init(){
        this.x = 30;
        this.y = this.ground;
        this.currentState = this.states[1];
        this.speed = 0;
        this.frameTimer = 0;
        this.restart = false;
    }
    setRestart(){
        this.restart = true;
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    update(input, deltaTime, enemies){
        // collision detection
        enemies.forEach(enemy => {
            const dx = (enemy.x + enemy.width / this.sizeOffset) - (this.x + this.scrWidth / this.widthOffset);
            const dy = (enemy.y + enemy.height / this.sizeOffset) - (this.y + this.scrHeight / this.heightOffset);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (enemy.width / enemy.sizeOffset) + (this.scrWidth / this.sizeOffset)){
                this.game.gameOver = true;
            }
        });
        // sprite animation
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX =0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // controls
        this.currentState.handleInput(input);

        // horizontal movement
        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.scrWidth) this.x = this.game.width - this.scrWidth;
        // vertical movement
        this.y += this.vy;
         if (!this.onGround()) {
             this.vy += this.weight;
         } else {
             this.vy = 0;
         }
         if (this.y > this.ground){
             this.y = this.ground;
         };
    }
    onGround(){
        return this.y >= this.ground;
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