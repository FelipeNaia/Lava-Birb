class orb{
    constructor(attachedTo){
        this.color = "blue";
        this.isArround = attachedTo;
        this.speed = 0.1;
        this.angle = Math.random()*2*Math.PI;
        this.radius = 5;
        this.xpos;
        this.ypos;
    }

    calcX(){
        let x = this.isArround.xpos;
        x += Math.cos(this.angle)*50;
        return x;

    }
    calcY(){
        let y = this.isArround.ypos;
        y += Math.sin(this.angle)*50;
        return y;

    }

    update(){
        this.angle += this.speed;
        this.xpos = this.calcX();
        this.ypos = this.calcY();
    }

    draw(){

        this.update();

        c.beginPath();
        c.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();

        c.beginPath();
        c.arc(this.xpos, this.ypos, this.radius - 2, 0, Math.PI * 2, false);
        c.strokeStyle = 'rgb(0, 182, 255)';
        c.stroke();

        c.beginPath();
        c.arc(this.xpos, this.ypos, this.radius - 4, 0, Math.PI * 2, false);
        c.strokeStyle = 'rgb(0, 182, 255)';
        c.stroke();
        
        c.fillStyle = this.color;
        c.fill();
    }

}