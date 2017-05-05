import Organism from '../orgasnism';
import {getRandom} from '../../utilities';

export default class Animal extends Organism{
    constructor(pos){
        super(pos);
    }
    action(){
        let dir = getRandom(1,9);
        console.debug("pos, dir, posAtDir", this.pos, dir, this.getPosAtDir(this.pos, dir));

    }
};