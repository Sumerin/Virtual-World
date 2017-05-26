import Animal from './animal';
import {areEqual} from "../../utilities";
import {getPosAtDir} from "../../utilities";

export default class Human extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 5;
        this.initiative = 4;
        setTimeout(()=>{
            this.world.humanAlive = true;
        },0);
    }
    keyPressed(e){
        let pressed = e.code;
        if(pressed.indexOf("Numpad") !== -1){
            this.dir = pressed.slice(-1);
        }
        console.debug("this.dir", this.dir);
    }
    act(resolve, dir){
        let newPos = getPosAtDir(this.pos, dir);
        if (areEqual(this.pos, newPos)){
            resolve(false);
            return false;
        }
        let mapState = this.world.getMapState(newPos);
        if (!mapState && !this.moved) {
            this.move(newPos);
            this.moved = true;
        } else if (mapState.pos && !this.moved) {
            this.collision(mapState);
            this.moved = true;
        }
        window.removeEventListener('keydown', this.keyPressed);
        resolve(dir);
    }
    action(){
        this.moved = false;
        return new Promise((resolve,reject)=>{
            window.addEventListener('keydown', (e)=>{
                let pressed = e.code;
                let dir;
                if(pressed.indexOf("Numpad") !== -1) {
                    dir = pressed.slice(-1);
                    this.act(resolve, dir);
                }
            })
        });
    }
    onDestroy(){
        this.world.humanAlive = false;
        this.world.runGame();
    }
};