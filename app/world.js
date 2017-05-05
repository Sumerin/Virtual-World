import { WrongSizeGivenException, OutOfRangeException } from './errors';

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
        organism.id = this.counter;
        ++this.counter;
        organism.world = this;
        this.setMapState(organism.pos, organism);
        this.organisms.push(organism);
    }
    deleteOrganism(organism){
        this.setMapState(organism.pos, undefined);
        let i = this.organisms.findIndex(el=>{
            return el.id==organism.id;
        });
        this.organisms.splice(i,1);
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
};