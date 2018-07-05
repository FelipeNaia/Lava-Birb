class Population {   //class that controls the population of birds, and evolves them
    constructor(size) {
        this.birds = [];
        this.size = size;
        this.actualBird = 0; //kind of an index for the population
        for (let i = 0; i < size; i++) {
            this.birds.push(new bird());
        }
        this.generation = 0;
    }

    restart(){
        let healed = [];

        for(let i = 0; i < this.birds.length; i++){
            let b = this.birds[i];
            b.reset();
            healed.push(b);
        }

        return healed;
    }

    nextGen(){
        this.generation++;
        //console.log("Passaros novos")
        this.actualBird = 0;
        ordenaScore(this.birds);
        let newGen = [];
        let melhor = this.birds[this.birds.length - 1];
        newGen.push(melhor);

        ordenaMaxScore(this.birds);
        let top = this.birds[this.birds.length - 1];
        newGen.push(top);

        for(let i = 1; i < this.birds.length * 0.3 ; i++){
            let novo = this.birds[this.birds.length - i];
            novo.evolve();
            newGen.push(novo);
        }

        newGen.push(new bird());

        while(newGen.length < this.size){
            let novo = pickRandom(this.birds);
            novo.evolve();
            newGen.push(novo);
        }

        this.birds = newGen;

        
        this.birds = this.restart();
        //console.log(this.birds.length);

    }

    next(){
        if (this.actualBird < this.birds.length - 1) {
            newLava(lavaAmount);
            this.actualBird++;
        }
        else{
            this.nextGen();
            //this.birds = this.restart();
            console.log(this.birds);
            
        }
    }

    update() {
        this.birds[this.actualBird].update();
        /*
        if (this.birds[this.actualBird].hp <= 0) {
            
            if (this.actualBird < this.birds.length - 1) {
                console.log('pulando' + this.birds[this.actualBird].hp);
                newLava(lavaAmount);
                this.actualBird++;
            }
            else{
                this.nextGen();
                this.birds = this.restart();
                console.log(this.birds);
                
            }
        }*/
       
    }

    draw() {
        this.birds[this.actualBird].draw();
        
    }
}