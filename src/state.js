export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
}
class State {
    constructor(state){
        this.state = state;
    }
}
export class StandingLeft extends State {
    constructor(player){
        super('STANDING_LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('Swipe Right') > -1) this.player.setState(states.STANDING_RIGHT, 0);
        else if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('Swipe Left') > -1) this.player.setState(states.RUNNING_LEFT, 1);
        else if (input.keys.indexOf('ArrowDown') > -1 || input.keys.indexOf('Swipe Down') > -1) this.player.setState(states.SITTING_LEFT, 0);
        else if (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('Swipe Up') > -1) this.player.setState(states.JUMPING_LEFT, 0.5);
    }
}
export class StandingRight extends State {
    constructor(player){
        super('STANDING_RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('Swipe Left') > -1) this.player.setState(states.STANDING_LEFT, 0);
        else if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('Swipe Right') > -1) this.player.setState(states.RUNNING_RIGHT, 1);
        else if (input.keys.indexOf('ArrowDown') > -1 || input.keys.indexOf('Swipe Down') > -1) this.player.setState(states.SITTING_RIGHT, 0);
        else if (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('Swipe Up') > -1) this.player.setState(states.JUMPING_RIGHT, 0.5);
    }
}
export class SittingLeft extends State {
    constructor(player){
        super('SITTING_LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('Swipe Right') > -1) this.player.setState(states.SITTING_RIGHT, 0);
        else if (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('Swipe Up') > -1) {
            this.player.setState(states.STANDING_LEFT, 0);
            if (input.keys.indexOf('Swipe Up') > -1) input.keys.splice(input.keys.indexOf('Swipe Up'), 1);
            if (input.keys.indexOf('ArrowUp') > -1) input.keys.splice(input.keys.indexOf('ArrowUp'), 1);
        }
    }
}
export class SittingRight extends State {
    constructor(player){
        super('SITTING_RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('Swipe Left') > -1) this.player.setState(states.SITTING_LEFT, 0);
        else if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('Swipe Right') > -1) this.player.setState(states.RUNNING_RIGHT, 1);
        else if (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('Swipe Up') > -1) {
            this.player.setState(states.STANDING_RIGHT, 0);
            if (input.keys.indexOf('ArrowUp') > -1) input.keys.splice(input.keys.indexOf('ArrowUp'), 1);
            if (input.keys.indexOf('Swipe Up') > -1) input.keys.splice(input.keys.indexOf('Swipe Up'), 1);
        }
    }
}
export class RunningLeft extends State {
    constructor(player){
        super('RUNNING_LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.speed = -this.player.maxSpeed;
        this.player.maxFrame = 8;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('Swipe Right') > -1) this.player.setState(states.RUNNING_RIGHT, 1);
        else if (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('Swipe Up') > -1) this.player.setState(states.JUMPING_LEFT, 1);
        else if (input.keys.indexOf('ArrowDown') > -1 || input.keys.indexOf('Swipe Down') > -1) this.player.setState(states.SITTING_LEFT, 0);
    }
}
export class RunningRight extends State {
    constructor(player){
        super('RUNNING_LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.speed = this.player.maxSpeed;
        this.player.maxFrame = 8;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('Swipe Left') > -1) this.player.setState(states.RUNNING_LEFT, 1);
        else if (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('Swipe Up') > -1) this.player.setState(states.JUMPING_RIGHT, 1);
        else if (input.keys.indexOf('ArrowDown') > -1 || input.keys.indexOf('Swipe Down') > -1) this.player.setState(states.SITTING_RIGHT, 0);
    }
}
export class JumpingLeft extends State {
    constructor(player){
        super('JUMPING_LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 3;
        if (this.player.onGround()) this.player.vy = -30;
        this.player.speed = -this.player.maxSpeed * 0.5;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('Swipe Right') > -1) this.player.setState(states.JUMPING_RIGHT, 1);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT, 0);
        else if (this.player.vy > 0) this.player.setState(states.FALLING_LEFT, 1);
    }
}
export class JumpingRight extends State {
    constructor(player){
        super('JUMPING_RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 2;
        if (this.player.onGround()) this.player.vy = -30;
        this.player.speed = this.player.maxSpeed * 0.5;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('Swipe Left') > -1) this.player.setState(states.JUMPING_LEFT, 1);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT, 0);
        else if (this.player.vy > 0) this.player.setState(states.FALLING_RIGHT, 1);
    }
}
export class FallingLeft extends State {
    constructor(player){
        super('FALLING_LEFT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('Swipe Right') > -1) this.player.setState(states.FALLING_RIGHT, 1);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT, 0);
    }
}
export class FallingRight extends State {
    constructor(player){
        super('FALLING_RIGHT');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('Swipe Left') > -1) this.player.setState(states.FALLING_LEFT, 1);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT, 0);
    }
}