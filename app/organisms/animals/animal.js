import Organism from '../organism';
import {getRandom} from '../../utilities';

export default class Animal extends Organism{
    constructor(pos){
        super(pos);
    }
    action() {
        let dir = getRandom(1, 9);
        if (dir == 5) return;
        let newPos = this.getPosAtDir(this.pos, dir);
        let mapState = this.world.getMapState(newPos);
        if (!mapState) {
            this.move(newPos);
        } else if (mapState == -1) {
            this.action();
        }
    }

};