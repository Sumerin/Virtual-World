import Plant from './plant';

export default class Guarana extends Plant{
    constructor(pos){
        super(pos);
    }
    react(encountered){
        encountered.strength += 3;
    }
};