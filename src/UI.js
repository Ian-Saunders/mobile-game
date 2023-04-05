export class UI {
    constructor(game) {
        this.game = game;
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;
        context.shadowBlur = 10;
        context.shadowColor = 'black';
        context.textAlign = 'left';
        context.font = this.game.fontSize + 'px ' + this.game.fontFamily;
        context.fillStyle = this.game.fontColour;
        context.fillText('Score: ' + this.game.score, 52, 52);
        context.fillText('Energy: ' + this.game.player.energy, 52, 102);
        context.fillText('Lives: ' + this.game.player.lives, 52, 152);
        let tempTime = 0;
        if(!this.game.gameOver){
            tempTime = (this.game.time/1000).toFixed(2);
        } 
        context.fillText('Timer: ' + tempTime, 52, 202);
        context.restore();
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.game.fontSize + 'px ' + this.game.fontFamily;
            context.fillStyle = 'black';
            context.fillText('Game Over, press Enter or Swipe Down to try again!', this.game.width / 2 + (14*10), this.game.height / 2);
            context.fillText('You scored ' + this.game.score + ' in ' + this.game.maxTime/1000 + ' seconds!', this.game.width / 2 + (14*10), this.game.height / 2+80);
            context.fillStyle = this.game.fontColour;
            context.fillText('Game Over, press Enter or Swipe Down to try again!', this.game.width / 2 + 2+ (14*10), this.game.height / 2 + 2);
            context.fillText('You scored ' + this.game.score + ' in ' + this.game.maxTime/1000 + ' seconds!', this.game.width / 2 + 2+ (14*10), this.game.height / 2 + 82);
        }
        if (this.game.debug) {
            context.fillStyle = 'white';
            context.font = this.game.fontSize + 'px ' + this.game.fontFamily;
            context.fillText('State ' + this.game.player.currentState.state, this.game.width / 2,200);
            context.fillText('Pointer Down ' + (this.game.input.keys.includes('Pointer Down')), this.game.width / 2,250);
            context.fillText('Pointer Up ' + (!this.game.input.keys.includes('Pointer Down')), this.game.width / 2,300);
            context.fillText('Swipe Up ' + (this.game.input.keys.includes('Swipe Up')), this.game.width / 2,350);
            context.fillText('Swipe Down ' + (this.game.input.keys.includes('Swipe Down')), this.game.width / 2,400);
            context.fillText('Swipe Left ' + (this.game.input.keys.includes('Swipe Left')), this.game.width / 2,450);
            context.fillText('Swipe Right ' + (this.game.input.keys.includes('Swipe Right')), this.game.width / 2,500);
        }
    }
}