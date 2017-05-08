import Animal from './animal';
import {tryWithChance} from '../../utilities';

export default class Turtle extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 2;
        this.initiative = 1;
    }
    action() {
        if(tryWithChance(25)){
            super.action();
        }
    }
    defend(opponent){
        if(opponent.strength<5){
            return true;
        }
    }
};