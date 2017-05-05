import Animal from './animal';

export default class Sheep extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 4;
        this.initiative = 4;
    }
};