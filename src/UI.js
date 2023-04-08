export class UI {
    constructor(game) {
        this.game = game;
        this.fontColour = 'rgb(100,255,100)';
        this.fontSize = 60;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    }
    draw(context) {
        let startX = 10;
        context.save();
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;
        context.shadowBlur = 0;
        context.shadowColor = 'black';
        context.textAlign = 'left';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillStyle = this.fontColour;
        context.fillText('Score: ' + this.game.score, startX, 52);
        context.fillText('Energy: ' + this.game.player.energy, startX, 102);
        let tempTime = 0;
        if(!this.game.gameOver){
            tempTime = (this.game.time/1000).toFixed(2);
        } 
        context.fillText('Timer: ' + tempTime, this.game.canvas_width - 284, 52);
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.fillText('Game Over, press Enter or Swipe Down to try again!', this.game.width / 2 + (14*10), this.game.height / 2);
            context.fillText('You scored ' + this.game.score + ' in ' + this.game.maxTime/1000 + ' seconds!', this.game.width / 2 + (14*10), this.game.height / 2+80);
            context.fillStyle = this.game.fontColour;
            context.fillText('Game Over, press Enter or Swipe Down to try again!', this.game.width / 2 + 2+ (14*10), this.game.height / 2 + 2);
            context.fillText('You scored ' + this.game.score + ' in ' + this.game.maxTime/1000 + ' seconds!', this.game.width / 2 + 2+ (14*10), this.game.height / 2 + 82);
        }
        context.restore();
        for(let i = 0; i < this.game.player.lives; i++){
            context.drawImage(this.livesImage, startX*1.4 + i*50, 112, 52, 52);
        }

        if (this.game.debug) {
            context.fillStyle = 'white';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.fillText('State ' + this.game.player.currentState.state, this.game.width / 2,200);
            context.fillText('Pointer Down ' + (this.game.input.keys.includes('Pointer Down')), this.game.width / 2,250);
            context.fillText('Pointer Up ' + (!this.game.input.keys.includes('Pointer Down')), this.game.width / 2,300);
            context.fillText('Swipe Up ' + (this.game.input.keys.includes('Swipe Up')), this.game.width / 2,350);
            context.fillText('Swipe Down ' + (this.game.input.keys.includes('Swipe Down')), this.game.width / 2,400);
            context.fillText('Swipe Left ' + (this.game.input.keys.includes('Swipe Left')), this.game.width / 2,450);
            context.fillText('Swipe Right ' + (this.game.input.keys.includes('Swipe Right')), this.game.width / 2,500);
        }
        context.fillStyle = 'orange';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText('Pointer X ' + (this.game.input.mouseX), 450+this.game.width / 2,250);
        context.fillText('Pointer Y ' + (this.game.input.mouseY), 450+this.game.width / 2,300);
        context.fillText('Player X ' + (this.game.player.x), 450+this.game.width / 2,350);
        context.fillText('Player Y ' + (this.game.player.y), 450+this.game.width / 2,400);
    }
}