import Animal from './animal';

export default class Wolf extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 9;
        this.initiative = 5;
    }
};