import {WrongCoordinatesException, NoWorldAssignedException, NoMethodImplementedException} from '../errors';

export default class Organism{
    constructor(pos){
        this.strength=0;
        this.initiative=0;
        this.world = null;
        this.pos = pos;
        if(pos.x == null || pos.y == null){
            throw new WrongCoordinatesException(this.constructor.name);
        }
        setTimeout(()=>{
           if (!this.world){
               throw new NoWorldAssignedException(this.constructor.name);
           }
        },0)
    }
    action(){
        throw new NoMethodImplementedException('action');
    }
    collision(){
        throw new NoMethodImplementedException('collision');
    }
    move(newPos){
        this.world.setMapState(this.pos,0);
        this.world.setMapState(newPos,this);
        this.pos = newPos;
    }
}