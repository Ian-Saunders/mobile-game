export const fullScreenButton = document.getElementById('fullScreenButton');
export function toggleFullScreen(canvas){
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            alert(`Error, can't enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}