import Animal from './animal';
import {getRandom, getPosAtDir} from '../../utilities';

export default class Fox extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 4;
        this.initiative = 7;
    }
    action() {
        let dir = getRandom(1, 9);
        if (dir == 5) return;
        let newPos = getPosAtDir(this.pos, dir);
        let mapState = this.world.getMapState(newPos);
        if (!mapState) {
            this.move(newPos);
        } else if (mapState.pos && this.strength>=mapState.strength) {
            this.collision(mapState);
        } else if (mapState == -1) {
            let freeSpace = this.world.getFreeSpace(this.pos);
            if(freeSpace){
                this.move(freeSpace);
            }
        }else{
            let freeSpace = this.smellForFreeSpace();
            if(freeSpace){
                console.debug("Fox smelled free space");
                let mapState = this.world.getMapState(freeSpace);
                if(!mapState){
                    this.move(newPos);
                }else{
                    this.collision(mapState);
                }
            }
        }
    }
    smellForFreeSpace(){
        let mapState;
        let newPos;
        for(let dir=0; dir<=9; ++dir){
            if(dir==5) continue;
            newPos = getPosAtDir(this.pos,dir);
            mapState = this.world.getMapState(newPos);
            if(!mapState || mapState.pos && this.strength>=mapState.pos.strength) return newPos;
        }
    }
};