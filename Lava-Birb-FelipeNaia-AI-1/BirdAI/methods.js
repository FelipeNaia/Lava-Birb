function distance(obj1, obj2){
    let result = Math.pow(obj1.xpos - obj2.xpos, 2) + Math.pow(obj1.ypos - obj2.ypos, 2);
    return Math.sqrt(Math.abs(result));
}

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

function createCanvas() {
    canvas.id = "canv";
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    canv = document.getElementById("canv");
}