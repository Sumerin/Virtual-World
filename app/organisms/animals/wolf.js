import Animal from './animal';

export default class Wolf extends Animal{
    constructor(coordinates){
        super(coordinates);
        this.strength = 9;
        this.initiative = 5;
    }
};