class Population {   //class that controls the population of birds, and evolves them
    constructor(size) {
        this.birds = [];
        this.size = size;
        this.actualBird = 0; //kind of an index for the population
        for (let i = 0; i < size; i++) {
            this.birds.push(new bird());
        }
        this.generation = 0;
        this.melhor = this.birds[0];
        this.lastmelhor = 0;
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

    /*nextGen(){
        this.generation++;
        this.actualBird = 0;
        ordenaScore(this.birds);
        let newGen = [];
        let melhor = this.birds[this.birds.length - 1].himself();
        let melhorf = this.birds[this.birds.length - 1].child();
        newGen.push(melhor);
        newGen.push(melhorf);

        ordenaMaxScore(this.birds);
        let top = this.birds[this.birds.length - 1].himself();
        let topf = this.birds[this.birds.length - 1].child();
        newGen.push(top);
        newGen.push(topf);

        for(let i = 1; i < this.birds.length * 0.3 ; i++){
            let novo = this.birds[this.birds.length - i];
            newGen.push(novo.child());
        }

        newGen.push(new bird());

        while(newGen.length < this.size){
            let a = pickRandom(newGen)
            let novo = a.cross(pickRandom(newGen));
            newGen.push(novo.child());
        }

        this.birds = newGen;

    }*/

    nextGen(){

        if(this.melhor.maxScore > this.lastmelhor){
            mutationRate -= mutationRate * 0.05;
        }
        else if(mutationRate < 1){
            mutationRate +=  0.1;
        }

        this.lastmelhor = this.melhor.maxScore;

        this.generation++;
        this.actualBird = 0;
        let newGen = [];

        ordenaScore(this.birds);
        for(let i = this.birds.length - 1; i >= this.birds.length * 0.75; i--){
            newGen.push(this.birds[i].himself())
        }

        ordenaMaxScore(this.birds);
        for(let i = this.birds.length - 1; i >= this.birds.length * 0.85; i--){
            newGen.push(this.birds[i].himself())
        }

        let index =  this.birds.length - 1;
        while(index >= 0 && this.birds.length != newGen.length){
            newGen.push(this.birds[index].cross(pickRandom(newGen)))
        }

        this.birds = newGen
    }

    next(){
        if (this.actualBird < this.birds.length - 1) {
            newLava(lavaAmount);
            this.actualBird++;
        }
        else{
            this.nextGen();
            //this.birds = this.restart();
        }


    }

    update() {
        this.birds[this.actualBird].update();

        if(this.birds[this.actualBird].maxScore > this.melhor.maxScore){
            this.melhor = this.birds[this.actualBird];
        }
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