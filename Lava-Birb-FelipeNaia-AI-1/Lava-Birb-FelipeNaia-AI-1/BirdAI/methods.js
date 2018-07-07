function distance(obj1, obj2) {
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
    let body = document.getElementById("doCanvas");
    body.setAttribute('height', '600px');
    body.setAttribute('width', '800px');
    body.appendChild(canvas);
    canv = document.getElementById("canv");

    //slider.id = 'xtime';<input type="range" min="1" max="100" value="50" class="slider" id="myRange">
    //slider.setAttribute('type', 'range');
    slider = document.createElement('input');
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', '1');
    slider.setAttribute('max', '1000');
    slider.setAttribute('value', '1');
    slider.setAttribute('class', 'slider');
    let div = document.getElementById("aux");
    div.appendChild(slider);

}

function newLava(amount) {
    blast = [];
    for (let i = 0; i < amount; i++) {
        blast[i] = new Lavaball();
    }
}

function comparaScore(birdA, birdB) {
    if (birdA.score > birdB.score) {
        return 1;
    }
    if (birdA.score < birdB.score) {
        return -1;
    }

    return 0;
}

function ordenaScore(array){
    array.sort(comparaScore);
}

function pickRandom(array){
    let i = Math.random() * array.length;
    return array[Math.floor(i)];
}

function comparaMaxScore(birdA, birdB) {
    if (birdA.maxScore > birdB.maxScore) {
        return 1;
    }
    if (birdA.maxScore < birdB.maxScore) {
        return -1;
    }

    return 0;
}

function ordenaMaxScore(array){
    array.sort(comparaMaxScore);
}