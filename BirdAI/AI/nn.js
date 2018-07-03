/*let vec = [1, 2];
let a = new Perceptron(vec);
let b = new Perceptron(vec);
let inplayer = [a, b];
let c = new Perceptron(inplayer);
let d = new Perceptron(inplayer);
let hilayer = [c, d];
let o = new Perceptron(hilayer);
*/
let testV = [2, 3, 4];


class NeuralNetwork{
    constructor(inArray, inLayerSize, hidLayerSize, outLayerSize){
        //criar primeira layer
        this.inputLayer = []
        for(let i = 0; i < inLayerSize; i++){
            let newPer = new Perceptron(inArray);
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

    calculate(inp){
        for(let i = 0; i < this.inputLayer.length; i++){
            this.inputLayer[i].inputs = inp;
        }
        return this.outputLayer[0].output()
    }
}

let nn = new NeuralNetwork(testV, 9, 30, 1)