import "./style.scss";
import Wolf from './organisms/animals/wolf';
import World from './world';
import {drawWorld} from './representation';

let world = new World({width:10, height:10});
let pos = {
    x:3,
    y:3
};
let wolf = new Wolf(pos);
world.newOrganism(wolf);

wolf.action();
drawWorld(world);



