import { WrongSizeGivenException, OutOfRangeException, WrongOrganismIdWhileDeletingException } from './errors';
import { getPosAtDir } from './utilities'

export default class World{
    constructor(size){
        if(size.width==null || size.height==null){
            throw new WrongSizeGivenException();
        }
        this.size = size;
        this.map = new Array(size.height).fill().map(() => new Array(size.width).fill());
        this.organisms = [];
        this.counter = 0;
    }
    newOrganism(organism){
        organism.world = this;
        this.setMapState(organism.pos, organism);
        organism.id = this.counter++;
        this.organisms.push(organism);
    }
    deleteOrganism(organism){
        let index = this.organisms.findIndex(el=>{
            return el.id = organism.id;
        });
        if(organism.id != this.organisms[index].id){
            throw new WrongOrganismIdWhileDeletingException(organism);
        }
        this.setMapState(organism.pos, undefined);
        this.organisms.splice(organism.index,1);
    }
    getMapState(pos){
        if(pos.x<0 || pos.x>=this.size.width || pos.y<0 || pos.y>=this.size.height){
            return -1;
        }
        return this.map[pos.y][pos.x];
    }
    setMapState(pos, obj){
        if(pos.x<0 || pos.x>=this.size.width || pos.y<0 || pos.y>=this.size.height){
            throw new OutOfRangeException(pos)
        }
        this.map[pos.y][pos.x] = obj;
    }
    turn(){
        this.organisms.forEach(el=>{
            el.action();
        })
    }
    getFreeSpace(pos, empty){
        let mapState;
        let newPos;
        for(let dir=0; dir<=9; ++dir){
            if(dir==5) continue;
            newPos = getPosAtDir(pos,dir);
            mapState = this.getMapState(newPos);
            if((!mapState || mapState.pos && !empty) || !mapState) return newPos;
        }
    }
};