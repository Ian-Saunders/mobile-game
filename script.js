


class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        this.x = gameFrame * this.speed % this.width;
    }
    draw(){
        c.drawImage(this.image, this.x, this.y, this.width, this.height);
        c.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}
window.addEventListener('load', function(){
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext("2d");
    const canvas_height = canvas.width = 800;
    const canvas_width = canvas.height = 700;
    
    let gameSpeed = 4;
    let gameFrame =0;
    
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
    
    let x = 0;
    let x2 = 2400;
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    const layerObjects = [layer1,layer2,layer3,layer4,layer5];
    
    function animate(){
        c.clearRect(0,0,canvas.width,canvas.height);
        layerObjects.forEach(layer => {
            layer.update();
            layer.draw();
        });
        gameFrame--;
        requestAnimationFrame(animate);
    }
    animate();
});

