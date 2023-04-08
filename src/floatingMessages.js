export class FloatingMessages {
    constructor(value, x, y, targetX, targetY){
        this.x = x;
        this.y = y;
        this.value= value;
        this.targetX = targetX;
        this.targetY = targetY;
        this.delete = false;
        this.timer = 0;
    }
    update(){
        this.x += (this.targetX - this.x) * 0.03;
        this.y += (this.targetY - this.y) * 0.03;
        this.timer++;
        if (this.timer > 100) this.delete = true;
    }
    draw(context){
        context.font = '40px Creepster';
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black';
        context.fillText(this.value, this.x + 2, this.y + 2);
    }
}