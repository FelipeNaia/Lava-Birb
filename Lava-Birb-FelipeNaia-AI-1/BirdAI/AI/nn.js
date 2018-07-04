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
            let newPer = new Perceptron(this.inputLayer.length);
            this.hiddenLayer.push(newPer);
        }

        //criando outLayer
        this.outputLayer = [];
        for(let i = 0; i < outLayerSize; i++){
            let newPer = new Perceptron(this.hiddenLayer.length);
            this.outputLayer.push(newPer);
        }
    }

    calculate(input){
        //calcula resultado da primeira layer
        let firstLayerResult = [];
        for(let i = 0; i < this.inputLayer.length; i++){
            firstLayerResult.push(this.inputLayer[i].output(input));
        }

        let hiddenLayerResult = [];
        for(let i = 0; i < this.hiddenLayer.length; i++){
            hiddenLayerResult.push(this.hiddenLayer[i].output(firstLayerResult));
        }

        let outputLayerResult = [];
        for(let i = 0; i < this.outputLayer.length; i++){
            outputLayerResult.push(this.outputLayer[i].output(hiddenLayerResult));
        }

        return outputLayerResult;

    }

    mutate(){
        for(let i = 0; i < this.inputLayer.length; i++){
            if(Math.random() < mutationRate){
                this.inputLayer[i].change();
                // += (Math.random() - 0.5) * Math.random() * 2;
            }
        }

        for(let i = 0; i < this.hiddenLayer.length; i++){
            if(Math.random() < mutationRate){
                this.hiddenLayer[i].change();
            }
        }

        for(let i = 0; i < this.outputLayer.length; i++){
            if(Math.random() < mutationRate){
                this.outputLayer[i].change();
            }
        }
    }

}

