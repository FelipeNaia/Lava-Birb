class Bird {
    constructor() {
        this.hp = 100;
        this.newscore = 0;
        this.score = 0;
        this.maxScore = 0;
        // this.xpos = mouse.xpos;
        // this.ypos = mouse.ypos;
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
        this.color = 'rgb( ' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';


        //for (let i = 0; i < 0; i++) {
        //    this.orbs.push(new orb(this));
        //}
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