import "./style.scss";
import Wolf from './organisms/animals/wolf';
import World from './world';
import {drawWorld, initializeWorld} from './representation';

let world = new World({width:10, height:10});

let wolf = new Wolf({
    x:3,
    y:3
});
world.newOrganism(wolf);

let wolf2 = new Wolf({
    x:4,
    y:4
});
world.newOrganism(wolf2);

initializeWorld(world);
setInterval(()=>{
    world.turn();
    drawWorld(world);
},300);




