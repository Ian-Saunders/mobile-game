import { Dust, Fire, Splash } from './particles.js';

export const states = {
    STANDING: 0,
    SITTING: 1,
    RUNNING: 2,
    JUMPING: 3,
    FALLING: 4,
    ROLLING: 5,
    DIVING: 6,
    HIT: 7,
}
class State {
    constructor(state){
        this.state = state;
    }
}
export class Standing extends State {
    constructor(game){
        super('STANDING');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 0;
        this.game.player.speed = 0;
        this.game.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.keys.includes('ArrowRight') || input.keys.includes('Swipe Right')) { 
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.keys.includes('ArrowDown') || input.keys.includes('Pointer Down')) { 
            this.game.player.setState(states.SITTING, 0);
           // input.keys.splice(input.keys.indexOf('Pointer Down'), 1);
        } else if ((input.keys.includes('ArrowLeft') || input.keys.includes('Swipe Left')) || (input.keys.includes('ArrowRight') || input.keys.includes('Swipe Right'))) { 
            this.game.player.setState(states.RUNNING, 1);    
        } else if (input.keys.includes('ArrowUp') || input.keys.includes('Swipe Up')) { 
            this.game.player.setState(states.JUMPING, 1);
        }
    }
}
export class Sitting extends State {
    constructor(game){
        super('SITTING');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.speed = 0;
        this.game.player.maxFrame = 4;
    }
    handleInput(input){input
        if ((input.keys.includes('Pointer Down') || input.keys.includes('ArrowDown'))) { 
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.keys.includes('ArrowUp') || input.keys.includes('Swipe Up')) { 
            this.game.player.setState(states.STANDING, 0);
            input.keys.splice(input.keys.indexOf('Swipe Up'), 1);
        } else if ((input.keys.includes('ArrowLeft') || input.keys.includes('Swipe Left')) || (input.keys.includes('ArrowRight') || input.keys.includes('Swipe Right'))) { 
            this.game.player.setState(states.RUNNING, 1); 
        }   
    }
}
export class Running extends State {
    constructor(game){
        super('RUNNING');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
        this.game.player.speed = -this.game.player.maxSpeed;
        this.game.player.maxFrame = 8;
    }
    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.scrWidth/2, this.game.player.y+this.game.player.scrHeight));
        if (input.keys.includes('ArrowUp') || input.keys.includes('Swipe Up')) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.keys.includes('Pointer Down') || input.keys.includes('ArrowDown') && this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 2);
        } 
    }
}
export class Jumping extends State {
    constructor(game){
        super('JUMPING');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
        this.game.player.speed = -this.game.player.maxSpeed * 0.5;
        this.game.player.maxFrame = 6;
    }
    handleInput(input){
        if (this.game.player.onGround()) {
            this.game.player.setState(states.STANDING, 0);
        } else if (this.game.player.vy > 0) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.keys.includes('Pointer Down') || input.keys.includes('ArrowDown')) {
            this.game.player.setState(states.DIVING, 1);
        }
    }
}
export class Falling extends State {
    constructor(game){
        super('FALLING');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }
    handleInput(input){
        if (this.game.player.onGround()) {
            this.game.player.setState(states.STANDING, 0);
        } else if (input.keys.includes('Pointer Down') || input.keys.includes('ArrowDown')) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}
export class Rolling extends State {
    constructor(game){
        super('ROLLING');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.scrWidth/2, this.game.player.y+this.game.player.scrHeight/2)); 
        if (this.game.player.onGround() && ((input.keys.includes('ArrowUp') || input.keys.includes('Swipe Up')))) {
            this.game.player.vy = -30;
            this.game.player.setState(states.ROLLING, 2); 
        } else if (this.game.player.onGround() && (input.keys.includes('Pointer Down')|| input.keys.includes('ArrowDown'))) {
            this.game.player.setState(states.ROLLING, 2); 
        } else if (this.game.player.onGround()){
            this.game.player.setState(states.STANDING, 0);
        }
    }
}
export class Diving extends State {
    constructor(game){
        super('DIVING');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
        this.game.player.vy = 45;
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.scrWidth/2, this.game.player.y+this.game.player.scrHeight/2));
        if (this.game.player.onGround() && input.keys.includes('Pointer Down')) {
            this.game.player.setState(states.ROLLING, 1);
        } else if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
            for(let i = 0; i < 30; i++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.scrWidth/2, this.game.player.y+this.game.player.scrHeight/2));
            }
        }
    }
}
export class Hit extends State {
    constructor(game){
        super('HIT');
        this.game = game;
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 4;
        this.game.player.maxFrame = 10;
    }
    handleInput(input){
        if (this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()) {
            this.game.player.setState(states.STANDING, 0);
        } else if (this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 0);
        }
    }
}
