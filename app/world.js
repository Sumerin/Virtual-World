import { WrongSizeGivenException, OutOfRangeException, WrongOrganismIdWhileDeletingException, OrganismAlreadyDeletedException } from './errors';
import View from './view';
import { getPosAtDir } from './utilities'

export default class World{
    constructor(size){
        if(size.width==null || size.height==null){
            throw new WrongSizeGivenException();
        }
        this.size = size;
        this.map = new Array(size.height).fill(0).map(() => new Array(size.width).fill(0));
        this.organisms = new Map();
        this.counter = 0;

        this.view = new View(this);

        this.view.initialize();
        this.view.draw();

        this.stop = false;
        this.runGame();
    }
    toggleGame(){
        this.stop = !this.stop;
    }
    newOrganism(organism){
        organism.world = this;
        organism.key = this.counter++;
        this.organisms.set(organism.key, organism);
        this.setMapState(organism.pos, organism);
    }
    deleteOrganism(organism){
        if(organism.deleted) throw new OrganismAlreadyDeletedException(organism);
        this.setMapState(organism.pos, 0);
        this.organisms.delete(organism.key);
        organism.deleted = true;
    }
    getMapState(pos){
        if(pos.x<0 || pos.x>=this.size.width || pos.y<0 || pos.y>=this.size.height){
            return -1;
        }
        return this.map[pos.y][pos.x];
    }
    setMapState(pos, obj){
        if(obj && obj.deleted) throw new OrganismAlreadyDeletedException(obj);
        if(pos.x<0 || pos.x>=this.size.width || pos.y<0 || pos.y>=this.size.height){
            throw new OutOfRangeException(pos)
        }
        this.map[pos.y][pos.x] = obj;
        this.view.change(pos, obj);
    }
    turn(){
        this.organisms.forEach(el=>{
            if(el.deleted) throw new OrganismAlreadyDeletedException(el);
            el.action();
        });
        this.view.applyChanges();
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

    runGame(){
        let me = this;
        if(!this.stop) {
            this.turn();
            setTimeout(function(){me.runGame()}, 200);
        }
    }
};