import {WrongCoordinatesException, NoWorldAssigned} from '../errors';

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
               throw new NoWorldAssigned(this.constructor.name);
           }
        },0)
    }
}