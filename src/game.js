import Player from './player.js';
import InputHandler from './input.js';
import { Background } from './layer.js';
import { UI } from './UI.js';
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
        this.ground = this.canvas_height - 100 - 160;
        this.deltaTime = 0;
        this.lastTime = 0;
        this.gameFrame = 0;
        this.speed = 0;
        this.maxSpeed = 6;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.gameUI = new UI(this);
        this.particles = [];
        this.collisions = [];
        this.maxParticles = 200;
        this.layers = [];
        this.enemies = [];
        this.floatingMessages = [];
        this.enemyTimer = 0 ;
        this.enemyInterval = 1000;
        this.randomEnemyInterval = Math.random() * 1000 + 500;
        this.score = 0;
        this.time = 30000;
        this.maxTime = 30000;
        this.debug = false;
    }
    update(){
        this.background.update();
        if (!this.gameOver) this.player.update(this.input, this.deltaTime, this.enemies);
        this.enemies.forEach(enemy => {
            enemy.update(this.deltaTime);
        });
        if (this.restart) {
            this.restartGame();
            this.restart = false;
        }
        if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval){
            this.addEnemy();
            this.randomEnemyInterval = Math.random() * 1000 + 500;
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += this.deltaTime;
        }
        this.particles.forEach(particle => {
            particle.update();
        });
        if (this.particles.length > this.maxParticles){
            this.particles = this.particles.slice(0, this.maxParticles);
        }
        this.floatingMessages.forEach(floatingMessage => {
            floatingMessage.update();
        });
        this.collisions.forEach(collision => {
            if (!this.gameOver) collision.update();
        });
        this.gameFrame--;
        this.time -= this.deltaTime;
        if (this.time < 0) {
            this.gameOver = true;
        }
        this.collisions = this.collisions.filter(collision => !collision.delete);
        this.particles = this.particles.filter(particle => !particle.delete);
        this.enemies = this.enemies.filter(enemy => !enemy.delete);
    }
    draw(){
        this.background.draw(this.ctx);
        if (!this.gameOver) this.player.draw(this.ctx);
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });
        this.particles.forEach(particle => {
            particle.draw(this.ctx);
        });
        this.floatingMessages.forEach(floatingMessage => {
            floatingMessage.draw(this.ctx);
        });
        this.collisions.forEach(collision => {
            collision.draw(this.ctx);
        });
        this.gameUI.draw(this.ctx);
    } 
    addEnemy(){
        if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new FlyingEnemy(this));
    }
    restartGame(){
        this.score = 0;
        this.player.init();
        this.layers.forEach(layer => {
            layer.init();
        });
        this.enemies = [];
        this.collisions = [];
        this.particles = [];
        this.input.keys = [];
        this.speed = 0;
        this.maxSpeed = 3;
        this.gameOver = false;
        this.gameFrame = 0;
        this.deltaTime = 0;
        this.enemyTimer = 0;
        this.time = this.maxTime;
    }
}