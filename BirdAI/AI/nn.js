/*let vec = [1, 2];
let a = new Perceptron(vec);
let b = new Perceptron(vec);
let inplayer = [a, b];
let c = new Perceptron(inplayer);
let d = new Perceptron(inplayer);
let hilayer = [c, d];
let o = new Perceptron(hilayer);
*/


class NeuralNetwork{
    constructor(inArraySize, inLayerSize, hidLayerSize, outLayerSize){
        //criar primeira layer
        this.inputLayer = []
        for(let i = 0; i < inLayerSize; i++){
            let newPer = new Perceptron(inArraySize);
            this.inputLayer.push(newPer);
        }

        //criar hidden layer
        this.hiddenLayer = [];
        for(let i = 0; i < hidLayerSize; i++){
            let newPer = new Perceptron(this.inputLayer);
            this.hiddenLayer.push(newPer);
        }

        //criando outLayer
        this.outputLayer = [];
        for(let i = 0; i < outLayerSize; i++){
            let newPer = new Perceptron(this.hiddenLayer);
            this.outputLayer.push(newPer);
        }
    }

    calculate(inp, saida){
        for(let i = 0; i < this.inputLayer.length; i++){
            this.inputLayer[i].inputs = inp;
        }
        return this.outputLayer[saida].output()
    }
}

let nn = new NeuralNetwork(21, 21, 21, 3)