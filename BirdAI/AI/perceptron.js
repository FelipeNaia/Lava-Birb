class Perceptron {
    constructor(aSize) {
        this.inputs = [];
        this.weights = [];
        this.bias = (Math.random()-0.5) * 2;
        this.lastOutput;
        
        if(aSize instanceof Array){

            for (let i = 0; i < aSize.length; i++) {
                this.weights.push((Math.random()-0.5) * 2);
            }

            if(aSize[0] instanceof Perceptron){
                this.inputs = aSize;
            }
        }
        else{
            for (let i = 0; i < aSize; i++) {
                this.weights.push((Math.random()-0.5) * 2);
            }
        }

    }

    output() {
        let result = 0;

        if(this.inputs == undefined){
            return 0;
        }

        if (this.inputs[0] instanceof Perceptron) {
            for (let i = 0; i < this.inputs.length; i++) {
                result += this.inputs[i].output() * this.weights[i];
            }
        }
        else if(this.inputs instanceof Array){
            for (let i = 0; i < this.inputs.length; i++) {
                result += this.inputs[i] * this.weights[i];
            }
        }

        result += this.bias;
        this.lastOutput = result;
        return result;
    }
}