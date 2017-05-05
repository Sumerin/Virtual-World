import { WrongSizeGivenException, OutOfRangeException } from './errors';

export default class World{
    constructor(size){
        if(size.width==null || size.height==null){
            throw new WrongSizeGivenException();
        }
        this.size = size;
        this.map = new Array(size.height).fill().map(() => new Array(size.width).fill());
    }
    newOrganism(Organism){
        Organism.world = this;
        this.setMapState(Organism.pos, Organism);
    }
    getMapState(pos){
        if(pos.x<0 || pos.x>=this.size.width || pos.y<0 || pos.y>=this.size.height){
            throw new OutOfRangeException(pos)
        }
        return this.map[pos.y][pos.x];
    }
    setMapState(pos, obj){
        if (pos.x==obj.pos.x && pos.y==obj.pos.y){
            this.map[obj.pos.y][obj.pos.x] = obj;
            return;
        }
        if(pos.x<0 || pos.x>=this.size.width || pos.y<0 || pos.y>=this.size.height){
            throw new OutOfRangeException(pos)
        }
        this.map[pos.y][pos.x] = obj;
        this.map[obj.pos.y][obj.pos.x] = undefined;
        obj.pos = pos;
    }
};