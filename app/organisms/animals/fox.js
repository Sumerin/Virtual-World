import Animal from './animal';
import {getRandom, getPosAtDir} from '../../utilities';

export default class Fox extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 4;
        this.initiative = 7;
    }
    action() {
        if(!super.action()){
            let freeSpace = this.smellForFreeSpace();
            if(freeSpace){
                let mapState = this.world.getMapState(freeSpace);
                if(!mapState){
                    this.move(freeSpace);
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