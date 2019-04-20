let canvas = document.createElement('canvas');
let slider = document.createElement('slider');
let rodando = true;
let framecount = 0;
createCanvas();
let c = canv.getContext('2d');
let inpVector = [];
let comando;
let mutationRate = 0.05;

let blast = [];
let lavaAmount = 2;
newLava(lavaAmount);

let mouse = {
    xpos: innerWidth, 
    ypos: innerHeight
};

let passaro = new Bird();

addEventListener("mousemove", function(event){
    mouse.xpos = event.clientX;
    mouse.ypos = event.clientY;
});

window.addEventListener('keydown', this.check, false);
function check(e) {
    //  w   a   s   d
    //  87  65  83  68
    //console.log(e.keyCode);
    if (e.keyCode == 65) {
        passaro.esquerda();
    }
    if (e.keyCode == 68) {
        passaro.direita();
    }
    if (e.keyCode == 87) {
        passaro.pular();
    }
    if (e.keyCode == 80) {
        pause();
    }
}

let sec = 0;
function animate() {

    if (rodando) {
        requestAnimationFrame(animate);
    }
    
    passaro.update();

    c.textAlign = "left"
        c.font = "30px Sans seriff MS";

    c.fillStyle = 'gray';
        c.fillRect(0, 0, canvas.width, canvas.height);

        c.fillStyle = "green";
        c.fillText("Score: " + sec , 10, 40);

    for (let i = 0; i < blast.length; i++) {
        blast[i].draw();
    }

    passaro.draw();
}


animate();

/* useless code here:
*/
