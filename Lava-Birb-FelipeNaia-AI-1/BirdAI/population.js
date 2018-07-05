class Population {   //class that controls the population of birds, and evolves them
    constructor(size) {
        this.birds = [];
        this.size = size;
        this.actualBird = 0; //kind of an index for the population
        for (let i = 0; i < size; i++) {
            this.birds.push(new bird());
        }
    }

    nextGen(){
        console.log("Passaros novos")
        this.actualBird = 0;
        ordenaScore(this.birds);
        let newGen = [];
        let melhor = this.birds[this.birds.length - 1];
        newGen.push(melhor);

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

        for(let i = 0; i < this.birds.length; i++){
            this.birds[i].reset();
        }

        console.log(this.birds.length);

    }

    update() {
        if (this.birds[this.actualBird].hp <= 0) {
            if (this.actualBird < this.birds.length - 1) {
                newLava(lavaAmount);
                this.actualBird++;
            }
            else{
                this.nextGen();
            }
        }
    }

    draw() {
        this.update();
        this.birds[this.actualBird].draw();
    }
}