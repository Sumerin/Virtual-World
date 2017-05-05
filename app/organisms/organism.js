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

    //Direction is resembled by a number on numpad, so for example
    //7 means moving to upper-left corner, or 6 means moving right
    getPosAtDir(pos,dir){
        if(dir==5){
            return pos;
        }
        let x = pos.x;
        let y = pos.y;
        if(dir>=1 && dir<=3) {
            ++y;
        }else if(dir>=7 && dir<=9){
            --y;
        }
        if(dir==1||dir==4||dir==7){
            --x;
        }else if(dir==9||dir==6||dir==3){
            ++x;
        }
        return {
            x:x,
            y:y
        }
    }
    action(){
        throw new NoMethodImplementedException('action');
    }
    collision(){
        throw new NoMethodImplementedException('collision');
    }
}