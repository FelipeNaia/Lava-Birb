let canvas = document.createElement('canvas');
let rodando = true;
let framecount = 0;

let mouse = {
    xpos: innerWidth, 
    ypos: innerHeight
};


addEventListener("mousemove", function(event){
    mouse.xpos = event.clientX;
    mouse.ypos = event.clientY;

});

function pause() {
    console.log('pause')
    if (rodando == true) {
        rodando = false;
    }
    else {
        rodando = true;
        animate();
    }
}

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

function setup() {
    canvas.id = "canv";
    canvas.width = 1200;
    canvas.height = 600;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    canv = document.getElementById("canv");
} setup();


let c = canv.getContext('2d');
c.font = "30px Sans seriff MS";
let passaro = new bird()
let blast = [];

for (let i = 0; i < 4; i++) {
    blast[i] = new Lavaball();
    
}

let inpVector = [];

function animate() {
    framecount++;
    if (rodando) {
        requestAnimationFrame(animate);
    }

    inpVector = [];

    inpVector.push(passaro.xpos);
    inpVector.push(passaro.ypos);
    inpVector.push(passaro.dx);
    inpVector.push(passaro.dy);
    inpVector.push(passaro.energy);

    for (let i = 0; i < blast.length; i++) {
        inpVector.push(blast[i].xpos);
        inpVector.push(blast[i].ypos);
        inpVector.push(blast[i].dx);
        inpVector.push(blast[i].dy);
    }

    console.table(inpVector)

    c.fillStyle = 'gray';
    c.fillRect(0, 0, canvas.width, canvas.height);
   
    c.fillStyle = "green";
    c.fillText("Score: "+ framecount, 100, 100);

    for (let i = 0; i < blast.length; i++) {
        blast[i].draw();
    }
    passaro.draw();

}

animate();

