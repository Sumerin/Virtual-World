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
        } else if (mapState.pos) {
            this.collision(mapState);
        } else if (mapState == -1) {
            this.action();
        }
    }
    collision(encountered){
        if(this.constructor.name != encountered.constructor.name){
            this.fight(encountered);
        }else{
            this.breed();
        }
        this.action();
    }
    fight(encountered){

    }
    breed(){
        let dir;
        let newPos;
        let mapState;
        let i = 0;
        do{
            dir = getRandom(1, 9);
            newPos = this.getPosAtDir(this.pos, dir);
            mapState = this.world.getMapState(newPos);
            ++i; if(i>10) return;
        }while(mapState);
        let child = new this.constructor(newPos);
        this.world.newOrganism(child);
    }
};