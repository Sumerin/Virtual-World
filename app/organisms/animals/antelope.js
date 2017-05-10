import Animal from './animal';
import {tryWithChance} from '../../utilities';

export default class Antelope extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 4;
        this.initiative = 4;
    }
    action(){
        super.action(undefined,2)
    }
    react(){
        if(tryWithChance(50)){
            let freeSpace = this.world.getFreeSpace(this.pos, true);
            if(freeSpace){
                this.move(freeSpace);
            }
            return true;
        }
    }
    fight(encountered){
        super.fight(encountered, this.react());
    }
};