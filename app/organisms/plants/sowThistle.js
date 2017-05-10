import Plant from './plant';

export default class SowThistle extends Plant{
    constructor(pos){
        super(pos);
    }
    action(){
        for(let i=0;i<2;i++){
            if(super.action()){
                break;
            }
        }
    }
};