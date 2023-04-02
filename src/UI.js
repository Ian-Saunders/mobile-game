export class UI {
    constructor(game) {
        this.game = game;
    }
    draw(context) {
        context.textAlign = 'left';
        context.font = this.game.fontSize + 'px ' + this.game.fontFamily;
        context.fillStyle = 'black';
        context.fillText('Score: ' + this.game.score, 50, 50);
        context.fillText('Energy: ' + this.game.player.energy, 50, 100);
        context.fillText('Lives: ' + this.game.player.lives, 50, 150);
        context.fillStyle = this.game.fontColour;
        context.fillText('Score: ' + this.game.score, 52, 52);
        context.fillText('Energy: ' + this.game.player.energy, 52, 102);
        context.fillText('Lives: ' + this.game.player.lives, 52, 152);
        context.fillStyle = 'white';
        context.fillText('Pointer Down ' + (this.game.input.keys.includes('Pointer Down')), 900,50);
        context.fillText('Pointer Up ' + (!this.game.input.keys.includes('Pointer Down')), 900,100);
        context.fillText('State ' + this.game.player.currentState.state, 900,150);
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('Game Over, press Enter or Swipe Down to try again!', this.game.width / 2 + (14*10), this.game.height / 2);
            context.fillStyle = this.game.fontColour;
            context.fillText('Game Over, press Enter or Swipe Down to try again!', this.game.width / 2 + 2+ (14*10), this.game.height / 2 + 2);
        }
    }
}