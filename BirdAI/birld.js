class bird {
    constructor() {
        this.xpos = 100;
        this.ypos = 200;
        this.size = 40;
        this.dx = 1;
        this.dy = 0;
        this.hp = 100;
        this.decay = 0.97;
        this.grav = 0.14
        this.energy = 100;
        this.orbs = [];
        this.lado = 1;
        this.nn = new NeuralNetwork(21, 21, 21, 2)

        for (let i = 0; i < 0; i++) {
            this.orbs.push(new orb(this));
        }
    }

    think(input){
        let result = this.nn.calculate(input);
        if(result[0] > 2){
            this.pular()
        }

        if(result[1] > 5){
            this.direita()
        }
        else if(result[1] < -5){
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
        this.hp--;

        if (this.hp <= 0) {
            pause();
        }
    }
    damage(dano, boop) {
        this.hp -= dano;
        if (this.hp <= 0) {
            pause();
        }
        this.bump(boop);
    }

    update() {
        if (this.ypos >= canvas.height - this.size / 2 && this.dy >= 0 || this.ypos < 0) {
            this.dy = - this.dy;
            this.dmg();
        }
        else {
            this.dy += this.grav;
        }

        if (this.xpos > canvas.width - this.size / 2 || this.xpos < 0) {
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
    }

    draw() {

        this.update();

        for (let i = 0; i < this.orbs.length; i++) {
            this.orbs[i].draw();
        }

        c.fillStyle = 'yellow';
        c.fillRect((this.xpos - this.size / 2), (this.ypos - this.size / 2), this.size, this.size);

        c.fillStyle = 'rgba(255, 0, 0, 0.3)';
        c.fillRect(this.xpos - 30 - this.size / 2, this.ypos - 25 - this.size / 2, 100, 10);

        if (this.hp > 0) {
            c.fillStyle = 'green';
            c.fillRect(this.xpos - 30 - this.size / 2, this.ypos - 25 - this.size / 2, this.hp, 10);
        }

        c.fillStyle = 'blue';
        c.fillRect(this.xpos - 30 - this.size / 2, this.ypos - 16 - this.size / 2, this.energy, 2);

        if (this.lado == 1) {
            c.fillStyle = 'yellow';
            c.fillRect((this.xpos - this.size / 2) + 30, (this.ypos - this.size / 2) - 10, this.size / 2, this.size / 2);

            c.beginPath();
            c.arc((this.xpos - this.size / 2) + 43, (this.ypos - this.size / 2) - 3, 2, 0, Math.PI * 2, false);
            //c.arc(500, 500, 5, Math.PI * 2, false);
            c.strokeStyle = 'black';
            c.stroke();
            c.fillStyle = 'blue';
            c.fill();
        }

        if (this.lado == -1) {
            c.fillStyle = 'yellow';
            c.fillRect((this.xpos - this.size / 2) - 10, (this.ypos - this.size / 2) - 10, this.size / 2, this.size / 2);

            c.beginPath();
            c.arc((this.xpos - this.size / 2) -2    , (this.ypos - this.size / 2) - 3, 2, 0, Math.PI * 2, false);
            //c.arc(500, 500, 5, Math.PI * 2, false);
            c.strokeStyle = 'black';
            c.stroke();
            c.fillStyle = 'blue';
            c.fill();
        }

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