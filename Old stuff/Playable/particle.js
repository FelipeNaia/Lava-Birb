class particle{
    constructor(cx, cy){
        this.xpos = cx;
        this.ypos = cy;
        this.size = (Math.random() * 4) + 1;
        this.dx = (Math.random()-0.5) * 16;
        this.dy = (Math.random()-0.5) * 16;
        this.red = 255;
        this.green = 254;
        this.decay = 0.9+(Math.random()*0.1);
        this.grav = 0.14
    }

    update(){
        if(this.ypos >= canvas.height - this.size || this.ypos < 0){
            this.dy = - this.dy;
        }
        else{
            this.dy += this.grav;
        }

        if(this.xpos > canvas.width - this.size || this.xpos < 0){
            this.dx = - this.dx;
        }

        if(this.red>0){
            this.red-= 5;
        }
        if(this.green>2){
            this.green-= 10
        }

        if(this.size>0){
            this.size = this.size * 0.9;
        }

        this.dx = this.dx * this.decay;
        this.dy = this.dy * this.decay;

        this.ypos += this.dy;
        this.xpos += this.dx;


    }

    draw(){        
        this.update();

        c.beginPath();
        c.arc(this.xpos, this.ypos, this.size, 0, Math.PI * 2, false);
        c.strokeStyle = 'red';
        c.stroke();
        
        c.fillStyle = 'rgba(' + this.red + ', ' + this.green + ', 0, 1)';
        c.fill();
        //c.fillRect(this.xpos- this.size / 2, this.ypos- this.size / 2, this.size, this.size);
    }
}