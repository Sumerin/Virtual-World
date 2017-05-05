import Organism from '../organism';
import {getRandom} from '../../utilities';

export default class Animal extends Organism{
    constructor(pos){
        super(pos);
    }
    action(){
        let dir = getRandom(1,9);
        let newPos = this.getPosAtDir(this.pos, dir);
        let mapState = this.world.getMapState(newPos);
        if(!mapState){
            this.world.setMapState(newPos,this);
        }
    }
};