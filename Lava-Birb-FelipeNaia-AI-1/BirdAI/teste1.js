let canvas = document.createElement('canvas');
let rodando = true;
let framecount = 0;
createCanvas();
let c = canv.getContext('2d');
c.font = "30px Sans seriff MS";
let inpVector = [];
let comando;
let mutationRate = 0.1;

let blast = [];
let lavaAmount = 4;
for (let i = 0; i < lavaAmount; i++) {
    blast[i] = new Lavaball();
}

let actualBird;
let popSize = 10;
let population = [];
for (let i = 0; i < popSize; i++) {
    population[i] = new bird();    
}

window.addEventListener('keydown', this.check, false);
function check(e) {
    if (e.keyCode == 80) {
        pause();
    }
}

function animate() {
    framecount++;
    if (rodando) {
        requestAnimationFrame(animate);
    }

    c.fillStyle = 'gray';
    c.fillRect(0, 0, canvas.width, canvas.height);
   
    c.fillStyle = "green";
    c.fillText("Score: "+ framecount, 10, 40);

    for (let i = 0; i < blast.length; i++) {
        blast[i].draw();
    }

    for (let i = 0; i < population.length; i++) {

        inpVector = [];
        for (let i = 0; i < blast.length; i++) {
            inpVector.push(blast[i].xpos/canvas.width);
            inpVector.push(blast[i].ypos/canvas.height);
            inpVector.push(blast[i].dx/8);
            inpVector.push(blast[i].dy/8);
        }

        population[i].draw();    
    }

}

animate();

/* useless code here:

let mouse = {
    xpos: innerWidth, 
    ypos: innerHeight
};

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
*/