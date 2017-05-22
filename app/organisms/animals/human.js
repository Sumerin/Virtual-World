import Animal from './animal';

export default class Human extends Animal{
    constructor(pos){
        super(pos);
        this.strength = 5;
        this.initiative = 4;
    }
    keyPressed(e){
        let pressed = e.code;
        if(pressed.indexOf("Numpad") !== -1){
            this.dir = pressed.slice(-1);
        }
        console.debug("this.dir", this.dir);
    }
    action(){
        window.addEventListener('keydown', this.keyPressed);



        //window.removeEventListener('keydown', this.keyPressed);
    }
};