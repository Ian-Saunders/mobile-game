const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
const canvas_height = canvas.width = 600;
const canvas_width = canvas.height = 600;
let gameFrame = 0;

const playerImage = new Image();
playerImage.src= './gfx/shadow_dog.png';
let playerState = 'idle';
const spriteWidth = 575;
const spriteHeight = 523;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j< state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames;
});

function animate(){
    c.clearRect(0,0,canvas_width,canvas_height);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;
    c.drawImage(playerImage,frameX, frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();