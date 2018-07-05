class bird {
    constructor() {
        this.score = 0;
        this.maxScore = 0;
        this.xpos = 100;
        this.ypos = 200;
        this.size = 20;
        this.dx = 1;
        this.dy = 0;
        this.hp = 100;
        this.decay = 0.97;
        this.grav = 0.14
        this.energy = 100;
        this.orbs = [];
        this.lado = 1;
        this.nn = new NeuralNetwork(21, 21, 21, 2)
        

        //for (let i = 0; i < 0; i++) {
        //    this.orbs.push(new orb(this));
        //}
    }

    reset(){
        this.xpos = 100;
        this.ypos = 200;
        this.score = 0;
        this.dx = 1;
        this.dy = 0;
        this.energy = 100;
        this.hp = 100;
    }

    think(inputx) {

        let input = inputx;//copies the input array

        //fill input array with its own info
        input.push(this.xpos / canvas.width);
        input.push(this.ypos / canvas.height);
        input.push(this.dx / 10);
        input.push(this.dy / 10);
        input.push(this.energy / 100);

        let result = this.nn.calculate(input);
        if (result[0] > 2) {
            this.pular()
        }

        if (result[1] > 5) {
            this.direita()
        }
        else if (result[1] < -5) {
            this.esquerda()
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
        this.hp -= 10;

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
            this.energy += 0.5;
        }

        this.dx = this.dx * this.decay;
        this.dy = this.dy * this.decay;

        this.ypos += this.dy;
        this.xpos += this.dx;

        if (this.hp > 0) {
            this.score++;
            this.think(inpVector)
        }

        if (this.score > this.maxScore) {
            this.maxScore = this.score;
        }
    }

    draw() {

        this.update();

        for (let i = 0; i < this.orbs.length; i++) {
            this.orbs[i].draw();
        }

        //c.fillStyle = 'yellow';
        //c.fillRect((this.xpos - this.size / 2), (this.ypos - this.size / 2), this.size, this.size); this for minecraft birb

        c.beginPath();
        c.arc(this.xpos, this.ypos, this.size, 0, Math.PI * 2, false);
        c.strokeStyle = 'yellow';
        c.stroke();
        c.fillStyle = 'yellow';
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
            c.strokeStyle = 'yellow';
            c.stroke();
            c.fillStyle = 'yellow';
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
            c.strokeStyle = 'yellow';
            c.stroke();
            c.fillStyle = 'yellow';
            c.fill();

            c.beginPath();
            c.arc(this.xpos - 22, this.ypos - 18, 2, 0, Math.PI * 2, false);
            //c.arc(500, 500, 5, Math.PI * 2, false);
            c.strokeStyle = 'black';
            c.stroke();
            c.fillStyle = 'blue';
            c.fill();
        }

        c.textAlign="center";
        c.font = "15px Sans seriff MS";
        c.fillStyle = "green";
        c.fillText(this.score, this.xpos, this.ypos);

    }

    direita() {
        if (this.energy > 20) {
            this.dx += 3;
            this.energy -= 20;
            this.lado = 1;
        }


    }

    esquerda() {
        if (this.energy > 20) {
            this.dx -= 3;
            this.energy -= 20;
            this.lado = -1;
        }
    }

    pular() {
        if (this.energy > 20) {
            this.dy = -10;
            this.energy -= 20;
        }
    }
}