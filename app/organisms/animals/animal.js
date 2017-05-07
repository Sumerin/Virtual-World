import Organism from '../organism';
import {getRandom, getPosAtDir} from '../../utilities';

export default class Animal extends Organism{
    constructor(pos){
        super(pos);
    }
    action() {
        let dir = getRandom(1, 9);
        if (dir == 5) return;
        let newPos = getPosAtDir(this.pos, dir);
        let mapState = this.world.getMapState(newPos);
        if (!mapState) {
            this.move(newPos);
        } else if (mapState.pos) {
            this.collision(mapState);
        } else if (mapState == -1) {
            let freeSpace = this.world.getFreeSpace(this.pos);
            if(freeSpace){
                this.move(freeSpace);
            }
        }
    }
    collision(encountered){
        if(this.constructor.name != encountered.constructor.name){
            this.fight(encountered);
        }else{
            this.breed();
        }
    }
    fight(encountered){
        let newPos;
        if(this.strength>=encountered.strength){
            newPos = encountered.pos;
            this.world.deleteOrganism(encountered);
            this.move(newPos);
        }else{
            this.world.deleteOrganism(this);
        }
    }
    breed(){
        let dir;
        let newPos;
        let mapState;
        let i = 0;

        dir = getRandom(1, 9);
        newPos = getPosAtDir(this.pos, dir);
        mapState = this.world.getMapState(newPos);
        if(mapState){
            let freeSpace = this.world.getFreeSpace(this.pos,true);
            if(freeSpace){
                newPos = freeSpace;
            }else{
                return;
            }
        }
        let child = new this.constructor(newPos);
        this.world.newOrganism(child);
    }
};