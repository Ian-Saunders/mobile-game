export function drawStatusText(context, game){
    context.textAlign = 'left';
    context.font = '40px Helvetica';
    context.fillStyle= 'black';
    context.fillText('Restart: ' + game.restart, 900, 50);
    context.fillText('Active state: ' + game.player.currentState.state, 900, 90);
    context.fillText('Score: '+game.score,20,50);
    context.fillStyle= 'white';
    context.fillText('Score: '+game.score,22,52);
    context.fillText('Restart: ' + game.restart, 902, 52);
    context.fillText('Active state: ' + game.player.currentState.state, 902, 92);
    if(game.gameOver){
        context.textAlign = 'center';
        context.fillStyle= 'black';
        context.fillText('Game Over, press Enter or Swipe Down to try again!',game.width/2,game.height/2);
        context.fillStyle= 'white';
        context.fillText('Game Over, press Enter or Swipe Down to try again!',game.width/2+2,game.height/2+2);
    }
}