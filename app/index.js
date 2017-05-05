import "./style.scss";
import Wolf from './organisms/animals/wolf';
import World from './world';

let world = new World({width:10, height:20});
let pos = {
    x:1,
    y:15
};
let wolf = new Wolf(pos);
world.newOrganism(wolf);
wolf.action();