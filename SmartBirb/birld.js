class bird {
    constructor() {
        this.hp = 1;
        this.newscore = 0;
        this.score = 0;
        this.maxScore = 0;
        this.xpos = 100;
        this.ypos = 200;
        this.size = 20;
        this.dx = 0;
        this.dy = 0;
        this.decay = 0.97;
        this.grav = 0;
        this.energy = 100;
        this.orbs = [];
        this.lado = 1;
        this.nn = new NeuralNetwork( 3 * blast.length + 6, 3 * blast.length +6,  (3 * blast.length + 6), 4)
        this.color = 'rgb( ' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
        this.output;


        //for (let i = 0; i < 0; i++) {
        //    this.orbs.push(new orb(this));
        //}
    }

    reset() {
        this.xpos = 100;
        this.ypos = 200;
        this.dx = 1;
        this.dy = 0;
        this.energy = 100;
        this.hp = 1;
        this.score = this.newscore;
        this.newscore = 0;
    }

    think(inputx) {

        let input = inputx;//copies the input array

        //fill input array with its own info

        input.push(this.xpos / canvas.width);
        input.push(this.ypos / canvas.height);
        input.push((canvas.width - this.xpos) / canvas.width);
        input.push((canvas.height - this.ypos) / canvas.height);
        input.push(this.dx / 10);
        input.push(this.dy / 10);

        for (let i = 0; i < blast.length; i++) {
            blast[i].update();

            input.push(blast[i].xpos / canvas.width - this.xpos / canvas.width);
            input.push(blast[i].ypos / canvas.height - this.ypos / canvas.height);
            input.push(distance(this,blast[i]) / 100);
        }

        

        let result = this.nn.calculate(input);
        if (result[0] > 0) {
            this.pular();
        }
        
        if (result[1] > 0) {
            this.down();
        }

        if (result[2] > 0) {
            this.direita();
        }
         
        if (result[3] > 0) {
            this.esquerda();
        }

        return result;
    }

    bump(thatx) {
        this.dy = -6;
        if (thatx > this.xpos) {
            this.dx -= 5;
        }
        if (thatx < this.xpos) {
            this.dx += 5;
        }
    }

    dmg() {
        this.hp -= 40;

        if (this.hp <= 0) {
            //pause();
        }
    }
    damage(dano, boop) {
        this.hp -= dano;
        if (this.hp <= 0) {
            //pause();
        }
        this.bump(boop);
    }

    evolve() {
        this.nn.mutate();
    }

    child() {
        let criansa = new bird();
        criansa.nn = this.nn.copyNN();
        criansa.evolve();
        return criansa;
    }

    cross(otherB) {
        let nna = this.nn;
        let nnb = otherB.nn;


        let newNN = new NeuralNetwork();
        for (let i = 0; i < nna.inputLayer.length; i++) {
            if (Math.random() < 0.75) {
                newNN.inputLayer.push(nna.inputLayer[i].copyP())
            }
            else{
                newNN.inputLayer.push(nnb.inputLayer[i].copyP())
            }
        }

        for (let i = 0; i < nna.hiddenLayer.length; i++) {
            if (Math.random() < 0.75) {
                newNN.hiddenLayer.push(nna.hiddenLayer[i].copyP())
            }
            else{
                newNN.hiddenLayer.push(nnb.hiddenLayer[i].copyP())
            }
        }

        for (let i = 0; i < nna.outputLayer.length; i++) {
            if (Math.random() < 0.75) {
                newNN.outputLayer.push(nna.outputLayer[i].copyP())
            }
            else{
                newNN.outputLayer.push(nnb.outputLayer[i].copyP())
            }
        }

        let criansa = new bird();
        criansa.nn = newNN;
        return criansa;

    }

    himself() {
        let him = new bird();
        him.nn = this.nn.copyNN();
        him.color = this.color;
        him.maxScore = this.maxScore;
        return him;
    }

    update() {
        if (this.ypos >= canvas.height - this.size && this.dy >= 0 || this.ypos < this.size && this.dy <= 0) {
            this.dy = - this.dy;
            this.dmg();
        }
        else {
            this.dy += this.grav;
        }

        if (this.xpos > canvas.width - this.size || this.xpos < this.size) {
            this.dx = - this.dx;
            this.dmg();
        }

        for (let i = 0; i < blast.length; i++) {
            if (distance(blast[i], this) <= 30) {
                this.damage(10, blast[i].xpos);
                blast[i].hit(this.xpos, this.ypos);
            }
        }

        if (this.energy < 100) {
            this.energy++;
        }

        if(this.newscore % 50000 == 0){
            newLava(blast.length)
        }

        this.dx = this.dx * this.decay;
        this.dy = this.dy * this.decay;

        this.ypos += this.dy;
        this.xpos += this.dx;

        if (this.hp > 0) {
            this.newscore++;
            this.output = this.think(inpVector);
        }
        else {
            this.reset();
            population.next();
        }

        if (this.score > this.maxScore) {
            this.maxScore = this.score;
        }
    }

    draw() {


        for (let i = 0; i < this.orbs.length; i++) {
            this.orbs[i].draw();
        }

        //c.fillStyle = 'yellow';
        //c.fillRect((this.xpos - this.size / 2), (this.ypos - this.size / 2), this.size, this.size); this for minecraft birb

        c.beginPath();
        c.arc(this.xpos, this.ypos, this.size, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();

        //hp bar
        c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        c.fillRect(this.xpos - 50, this.ypos - 35 - this.size / 2, 100, 10);
        if (this.hp > 0) {
            c.fillStyle = 'green';
            c.fillRect(this.xpos - 50, this.ypos - 35 - this.size / 2, this.hp, 10);
        }

        //energy bar
        c.fillStyle = 'blue';
        c.fillRect(this.xpos - 50, this.ypos - 26 - this.size / 2, this.energy, 2);

        //head
        if (this.lado == 1) {
            //c.fillStyle = 'yellow';
            //c.fillRect((this.xpos - this.size / 2) + 30, (this.ypos - this.size / 2) - 10, this.size / 2, this.size / 2);

            c.beginPath();
            c.arc(this.xpos + 17, this.ypos - 17, this.size / 2, 0, Math.PI * 2, false);
            c.strokeStyle = this.color;
            c.stroke();
            c.fillStyle = this.color;
            c.fill();

            c.beginPath();
            c.arc(this.xpos + 22, this.ypos - 18, 2, 0, Math.PI * 2, false);
            //c.arc(500, 500, 5, Math.PI * 2, false);
            c.strokeStyle = 'black';
            c.stroke();
            c.fillStyle = 'blue';
            c.fill();
        }

        if (this.lado == -1) {
            c.beginPath();
            c.arc(this.xpos - 17, this.ypos - 17, this.size / 2, 0, Math.PI * 2, false);
            c.strokeStyle = this.color;
            c.stroke();
            c.fillStyle = this.color;
            c.fill();

            c.beginPath();
            c.arc(this.xpos - 22, this.ypos - 18, 2, 0, Math.PI * 2, false);
            //c.arc(500, 500, 5, Math.PI * 2, false);
            c.strokeStyle = 'black';
            c.stroke();
            c.fillStyle = 'blue';
            c.fill();
        }

        c.textAlign = "center";
        c.font = "15px Sans seriff MS";
        c.fillStyle = "green";
        c.fillText(this.newscore, this.xpos, this.ypos);

    }

    direita() {
        if (this.energy > 5) {
            this.dx += 5;
            this.energy -= 5;
            this.lado = 1;
        }


    }

    esquerda() {
        if (this.energy > 5) {
            this.dx -= 5;
            this.energy -= 5;
            this.lado = -1;
        }
    }

    pular() {
        if (this.energy > 5) {
            this.dy -= 5;
            this.energy -= 5;
        }
    }

    down() {
        if (this.energy > 5) {
            this.dy += 5;
            this.energy -= 5;
        }
    }
}