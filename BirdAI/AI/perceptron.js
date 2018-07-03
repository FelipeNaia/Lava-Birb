class Perceptron {
    constructor(inp) {
        this.inputs = inp;
        this.weights = [];
        this.bias = (Math.random()-0.5) * 2;
        for (let i = 0; i < this.inputs.length; i++) {
            this.weights.push((Math.random()-0.5) * 2);
        }
        this.lastOutput;
    }

    output() {
        let result = 0;

        if (this.inputs[0] instanceof Perceptron) {
            for (let i = 0; i < this.inputs.length; i++) {
                result += this.inputs[i].output() * this.weights[i];
            }
        }
        else {
            for (let i = 0; i < this.inputs.length; i++) {
                result += this.inputs[i] * this.weights[i];
            }
        }

        result += this.bias;
        this.lastOutput = result;
        return result;
    }
}