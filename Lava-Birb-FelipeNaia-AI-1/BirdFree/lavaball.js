class Lavaball{
    constructor(){
        this.xpos = canvas.width - 100;
        this.ypos = canvas.height / 2;
        this.size = 10;
        this.dx = (Math.random()-0.5) * 8 + 8;
        this.dy = (Math.random()-0.5) * 8 + 8;
        this.numberParticles = 30;
        this.particles = [];
        this.clockP = [];
        this.color1 = 0;
        this.color2 = 0;
        this.ptimer = 6;
    }

    boom(spawnx, spawny){
        for(let i = 0; i < this.numberParticles; i++){
            let p = new particle(spawnx, spawny)
            this.particles.push(p);
        }
        this.clockP.push(60);
    }

    hit(thatx, thaty){
            if(thatx > this.xpos && this.dx > 0){
                this.dx = -this.dx;
            }
            else if(thatx < this.xpos && this.dx < 0){
                this.dx = -this.dx;
            }
            if(thaty > this.ypos && this.dy > 0){
                this.dy = -this.dy;
            }
            else if(thaty < this.ypos && this.dy < 0){
                this.dy = -this.dy;
            }
        this.boom(this.xpos, this.ypos);
        
    }



    update(){
        if(this.ypos >= canvas.height - this.size || this.ypos < 0){
            this.dy = - this.dy;
            this.hp--;
        }

        if(this.xpos > canvas.width - this.size || this.xpos < 0){
            this.dx = - this.dx;
            this.hp--;
        }

        for(let i = 0; i < this.clockP.length; i++){
            this.clockP[i]--;
            if(this.clockP[i] <=1){
                this.clockP.splice(0, 1);
                this.particles.splice(0, this.numberParticles);
            }
        }

        this.ypos += this.dy;
        this.xpos += this.dx;
    }

    draw(){

        c.beginPath();
        c.arc(this.xpos, this.ypos, this.size, 0, Math.PI * 2, false);
        c.strokeStyle = 'orange';
        c.stroke();
        c.fillStyle = 'orange';
        c.fill();

        this.color1 = Math.random()*255;
        this.color2 = Math.random()*this.color1/2;
        let particleColor = 'rgba(' + this.color1 + ', ' + this.color2 + ', 0, 1)';

        for(let i = 0; i < 3; i++){
            c.beginPath();
            c.arc(this.xpos + ( (Math.random()- 0.5 ) * this.size * 2), this.ypos + ( (Math.random()- 0.5 ) * this.size * 2), Math.random()*3 + 1, 0, Math.PI * 2, false);
            c.strokeStyle = particleColor;
            c.stroke();
            c.fillStyle = particleColor;
            c.fill();
        }

        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].draw();
        }
    }
}