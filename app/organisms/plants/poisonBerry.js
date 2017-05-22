import Plant from './plant';

export default class PoisonBerry extends Plant{
    constructor(pos){
        super(pos);
        this.strength = 99;
    }
};