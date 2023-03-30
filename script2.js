const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
const canvas_height = canvas.width = 1000;
const canvas_width = canvas.height = 500;

const numberOfEnenmies = 100;
let gameEnemies = [];

class Enemy{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 100;
        this.height = 100;
        this.speed = Math.random() * 4 - 2;
    }
    update(){
        this.x += this.speed;
        this.y += this.speed;
    }
    draw(){
        c.strokeRect(this.x, this.y, this.width, this.height);
    }
}
for (let i = 0; i < numberOfEnenmies; i++) {
    gameEnemies.push(new Enemy());
}
function animate(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    gameEnemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    requestAnimationFrame(animate);
}

animate();