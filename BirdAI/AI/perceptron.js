class Perceptron {
    constructor(aSize) {
        this.weights = [];
        this.bias = (Math.random() - 0.5) * 2;

        for (let i = 0; i < aSize; i++) {
            this.weights.push((Math.random() - 0.5) * 2);
        }

    }

    output(inputs) {
        let result = 0;
        //console.log("eficiente");
        for (let i = 0; i < inputs.length; i++) {
            result += inputs[i] * this.weights[i];
        }

        result += this.bias;
        return result;
    }
}