import Player from './player.js';
import Enemy from './enemy.js';

import InputHandler from './input.js';
import { drawStatusText } from './utils.js';

export default class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.canvas_height = canvas.width = 1640;
        this.canvas_width = canvas.height = 900;
        this.gameOver = false;
        this.restart = false;
        this.enemies = [];
        this.deltaTime = 0;
        this.layers = [];
        this.lastTime = 0;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.gameFrame = 0;
        this.gameSpeed = 4;
        this.score = 0;
        this.debug = true;
        this.enemyTimer = 0 ;
        this.enemyInterval = 5000;
        this.randomEnemyInterval = Math.random() * 1000 + 500;
    }
    update(){
        this.layers.forEach(layer => {
            layer.update();
        });
        this.player.update(this.input, this.deltaTime, this.enemies);
        this.handleEnemies();
        this.gameFrame--;
        if (this.restart) {
            this.restartGame();
        }
    }
    draw(context){
        context.clearRect(0, 0, this.width, this.height);
        this.layers.forEach(layer => {
            layer.draw(context);
        });
        if (!this.gameOver) this.player.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
        drawStatusText(context, this);
    } 
    handleEnemies(){
        if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval){
            this.enemies.push(new Enemy(this));
            this.randomEnemyInterval = Math.random() * 1000 + 500;
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += this.deltaTime;
        }
        this.enemies.forEach(enemy => {
            enemy.update(this.deltaTime);
        });
        this.enemies = this.enemies.filter(enemy => !enemy.delete);
    }
    restartGame(){
        this.score = 0;
        this.player.init();
        this.layers.forEach(layer => {
            layer.init();
        });
        this.enemies = [];
        this.gameOver = false;
        this.gameFrame =0;
        this.lastTime = 0;
        this.enemyTimer = 0;
        this.restart = false;
        this.animate(0);
    }
    animate(timeStamp){
        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        this.update();
        this.draw(this.ctx);
        requestAnimationFrame(this.animate);
    }
}