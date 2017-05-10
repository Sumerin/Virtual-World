import Organism from '../organism';
import { tryWithChance } from '../../utilities';

export default class Plant extends Organism{
    constructor(pos){
        super(pos);
        this.strength = 0;
        this.initiative = 0;
    }
    action() {
        if(tryWithChance(10)){
            this.spread();
            return true;
        }
        return false;
    }
};