window.addEventListener("load", function(){
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext("2d");
    const canvas_height = canvas.width = 1400;
    const canvas_width = canvas.height = 720;
    let gameSpeed = 4;
    let gameOver = false;
    let gameFrame =0;
    let enemies = [];
    let score = 0;
    let debug = false;
    
    const backgroundLayer1 = new Image();
    backgroundLayer1.src = './gfx/layer-1.png';
    const backgroundLayer2 = new Image();
    backgroundLayer2.src = './gfx/layer-2.png';
    const backgroundLayer3 = new Image();
    backgroundLayer3.src = './gfx/layer-3.png';
    const backgroundLayer4 = new Image();
    backgroundLayer4.src = './gfx/layer-4.png';
    const backgroundLayer5 = new Image();
    backgroundLayer5.src = './gfx/layer-5.png';

    class InputHandler {
        constructor(){
            this.keys = [];
            this.touchY = '';
            this.touchThreshold = 30;

            window.addEventListener('keydown', e => {
                if((    e.key === 'ArrowDown'   || 
                        e.key === 'ArrowUp'      || 
                        e.key === 'ArrowLeft'  || 
                        e.key === 'ArrowRight') 
                        && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                } else if (e.key === 'Enter' && gameOver) {
                    restartGame();
                }
            });
            window.addEventListener('keyup', e => {
                if(    e.key === 'ArrowDown'   || 
                        e.key == 'ArrowUp'      || 
                        e.key === 'ArrowLeft'  || 
                        e.key === 'ArrowRight'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
            window.addEventListener('touchstart', e => {
                this.touchY = e.changedTouches[0].pageY;
            });
            window.addEventListener('touchmove', e => {
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;
                if (swipeDistance < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
                else if (swipeDistance > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
                    this.keys.push('swipe down');
                    if (gameOver) restartGame();
                }
            });
            
            window.addEventListener('touchend', e => {
                this.keys.splice(this.keys.indexOf('swipe up'), 1);
                this.keys.splice(this.keys.indexOf('swipe down'), 1);
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.ground = this.gameHeight - this.height - 120;
            this.x = 30;
            this.y = this.gameHeight - this.height;
            this.img = document.getElementById('playerImage');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
            this.maxFrame = 8;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.widthOffset = 1.8;
            this.sizeOffset = 2.9;
            this.heightOffset = 1.6;
        }
        init(){
            this.x = 30;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.frameTimer = 0;
        }
        update(input, deltaTime, enemies){
            gameSpeed = this.speed;

            // collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width / this.sizeOffset) - (this.x + this.width / this.widthOffset);
                const dy = (enemy.y + enemy.height / this.sizeOffset) - (this.y + this.height / this.heightOffset);
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < (enemy.width / enemy.sizeOffset) + (this.width / this.sizeOffset)){
                    gameOver = true;
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
            if (input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;
            } else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1)  && this.onGround()) {
                this.vy -= 28;
            } else {
                this.speed = 0;
            }
            // horizontal movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            // vertical movement
            this.y += this.vy;
            if (!this.onGround()) {
                this.vy += this.weight;
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.frameY = 0;
            }
            if (this.y > this.ground){
                this.y = this.ground;
                this.frameY = 0;
            };
        }
        onGround(){
            return this.y >= this.ground;
        }
        draw(context){
            if (debug) {
                context.strokeStyle = 'blue';
                context.beginPath();
                context.arc(this.x + this.width / this.widthOffset, this.y + this.height / this.heightOffset, this.width / this.sizeOffset, 0, Math.PI * 2);
                context.stroke();
            }
            context.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    class Layer {
        constructor(image, speedModifier){
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
            this.ground = this.gameHeight - this.height - 98;
        }
        init(){
            this.x = 0;
        }
        update(){
            this.speed = gameSpeed * this.speedModifier;
            this.x = gameFrame * this.speed % this.width;
        }
        draw(){
            c.drawImage(this.image, this.x, this.y, this.width, 720);
            c.drawImage(this.image, this.x + this.width, this.y, this.width, 720);
        }
    }



    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.img = document.getElementById('enemyImage');
            this.x = this.gameWidth + 100;
            this.y = this.ground = this.gameHeight - this.height - 122;;
            this.frameX = 0;
            this.speed = 8;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.delete = false;
            this.widthOffset = 2.2;
            this.heightOffset = 1.6;
            this.sizeOffset = 2;
        }
        update(deltaTime){
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width) {
                this.delete = true;
                score++;
            }
        }
        draw(context){
            if (debug) {
                context.strokeStyle = 'red';
                context.beginPath();
                context.arc(this.x + this.width / this.widthOffset, this.y + this.height / this.heightOffset, this.width / this.sizeOffset, 0, Math.PI * 2);
                context.stroke();
            }
            context.drawImage(this.img, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    //

    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.update(deltaTime);
            enemy.draw(c);
        });
        enemies = enemies.filter(enemy => !enemy.delete);
    }

    function displayStatusText(context){
        context.textAlign = 'left';
        context.font = '40px Helvetica';
        context.fillStyle= 'black';
        context.fillText('Score: '+score,20,50);
        context.fillStyle= 'white';
        context.fillText('Score: '+score,22,52);
        if(gameOver){
            context.textAlign = 'center';
            context.fillStyle= 'black';
            context.fillText('Game Over, press Enter to try again!',canvas.width/2,canvas.height/2);
            context.fillStyle= 'white';
            context.fillText('Game Over, press Enter to try again!',canvas.width/2+2,canvas.height/2+2);
        }
    }

    function restartGame(){
        score = 0;
        player.init();
        layers.forEach(layer => {
            layer.init();
        });
        enemies = [];
        gameOver = false;
        gameFrame =0;
        lastTime = 0;
        enemyTimer = 0 ;
        animate(0);

    }
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);

    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    const layers = [layer1,layer2,layer3,layer4,layer5];

    let lastTime = 0;
    let enemyTimer = 0 ;
    let enemyInterval = 5000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        layers.forEach(layer => {
            layer.update();
            layer.draw();
        });
        player.update(input, deltaTime, enemies);
        player.draw(c);
        handleEnemies(deltaTime);
        displayStatusText(c);
        gameFrame--;
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});
