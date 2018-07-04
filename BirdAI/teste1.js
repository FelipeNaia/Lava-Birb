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
    canvas.width = 800;
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
let comando;

function animate() {
    framecount++;
    if (rodando) {
        requestAnimationFrame(animate);
    }

    inpVector = [];

    inpVector.push(passaro.xpos/canvas.width);
    inpVector.push(passaro.ypos/canvas.height);
    inpVector.push(passaro.dx/10);
    inpVector.push(passaro.dy/10);
    inpVector.push(passaro.energy/100);

    for (let i = 0; i < blast.length; i++) {
        inpVector.push(blast[i].xpos/canvas.width);
        inpVector.push(blast[i].ypos/canvas.height);
        inpVector.push(blast[i].dx/8);
        inpVector.push(blast[i].dy/8);
    }

    comando = passaro.think(inpVector);


    c.fillStyle = 'gray';
    c.fillRect(0, 0, canvas.width, canvas.height);
   
    c.fillStyle = "green";
    c.fillText("Score: "+ framecount, 10, 40);
    c.fillText("Output[0]: "+ comando[0], 10, 80);
    c.fillText("Output[1]: "+ comando[1], 10, 120);


    for (let i = 0; i < blast.length; i++) {
        blast[i].draw();
    }
    passaro.draw();

}

animate();

