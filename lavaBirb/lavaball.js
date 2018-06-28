class Lavaball{
    constructor(){
        this.xpos = canvas.width - 100;
        this.ypos = canvas.height / 2;
        this.size = 20;
        this.dx = (Math.random()-0.5) * 16;
        this.dy = (Math.random()-0.5) * 16;
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
        this.clockP.push(6);
    }

    hit(thatx, thaty){
            if(thatx > this.xpos && this.dx > 0){
                this.dx = -this.dx;
                console.log('da esquerda');
            }
            else if(thatx < this.xpos && this.dx < 0){
                this.dx = -this.dx;
                console.log('da direita');
            }
            if(thaty > this.ypos && this.dy > 0){
                this.dy = -this.dy;
                console.log('de cima');
            }
            else if(thaty < this.ypos && this.dy < 0){
                this.dy = -this.dy;
                console.log('de baixo');
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

        for(let i = 0; i < passaro.orbs.length; i ++){
            if(distance(this, passaro.orbs[i]) < this.size/2 + passaro.orbs[i].radius){
                console.log('finish me!')
            }
        }

        this.ypos += this.dy;
        this.xpos += this.dx;
    }

    draw(){
        
        this.update();

        c.fillStyle = 'orange';
        c.fillRect(this.xpos- this.size / 2, this.ypos- this.size / 2, this.size, this.size);

        this.color1 = Math.random()*100 + 155;
        this.color2 = Math.random()*this.color1/2;

        c.fillStyle = 'rgba(' + this.color1 + ', ' + this.color2 + ', 0, 1)';
        c.fillRect(this.xpos - 2 + ( (Math.random()- 0.5 ) * this.size ), this.ypos - 2 + ( (Math.random()- 0.5 ) * this.size ), 4, 4);
        c.fillRect(this.xpos - 2 + ( (Math.random()- 0.5 ) * this.size ), this.ypos - 2 + ( (Math.random()- 0.5 ) * this.size ), 4, 4);
        c.fillRect(this.xpos - 2 + ( (Math.random()- 0.5 ) * this.size ), this.ypos - 2 + ( (Math.random()- 0.5 ) * this.size ), 4, 4);
        //c.fillRect(this.xpos + (Math.random()+1) * 6 - this.size, this.ypos + (Math.random()+1) * 6- this.size/2, 4, 4);
        //c.fillRect(this.xpos - 30, this.ypos - 15, 4, 4);

        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].draw();
        }
    }
}