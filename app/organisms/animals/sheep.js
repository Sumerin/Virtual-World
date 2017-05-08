import Animal from './animal';

export default class Sheep extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 3;
        this.initiative = 4;
    }
};