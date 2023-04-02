import Player from './player.js';
import InputHandler from './input.js';
import { Background } from './layer.js';
import { drawStatusText } from './utils.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemy.js';

export default class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.canvas_width = canvas.width = 1640;
        this.canvas_height = canvas.height = 900;
        this.gameOver = false;
        this.restart = false;
        this.ground = this.canvas_height - 100 - 228;
        this.enemies = [];
        this.deltaTime = 0;
        this.background = new Background(this);
        this.layers = [];
        this.lastTime = 0;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.gameFrame = 0;
        this.speed = 0;
        this.maxSpeed = 6;
        this.score = 0;
        this.debug = true;
        this.enemyTimer = 0 ;
        this.enemyInterval = 1000;
        this.randomEnemyInterval = Math.random() * 1000 + 500;
    }
    update(){
        this.background.update();
        this.player.update(this.input, this.deltaTime, this.enemies);
        this.enemies.forEach(enemy => {
            enemy.update(this.deltaTime);
        });
        this.gameFrame--;
        if (this.restart) {
            this.restartGame();
        }
        if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval){
            this.addEnemy();
            this.randomEnemyInterval = Math.random() * 1000 + 500;
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += this.deltaTime;
        }
        this.enemies = this.enemies.filter(enemy => !enemy.delete);
    }
    draw(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.background.draw(this.ctx);
        if (!this.gameOver) this.player.draw(this.ctx);
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });
        drawStatusText(this.ctx, this);
    } 
    addEnemy(){
        this.enemies.push(new FlyingEnemy(this));
    }
    restartGame(){
        this.score = 0;
        this.player.init();
        this.layers.forEach(layer => {
            layer.init();
        });
        this.enemies = [];
        this.speed = 0;
        this.maxSpeed = 3;
        this.gameOver = false;
        this.gameFrame =0;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.enemyTimer = 0;
        this.restart = false;
    }
}