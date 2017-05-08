import "./style.scss";
import Wolf from './organisms/animals/wolf';
import Sheep from './organisms/animals/sheep';
import Fox from './organisms/animals/fox'
import Turtle from './organisms/animals/turtle'
import World from './world';
import {drawWorld, initializeWorld} from './representation';

let world = new World({width:10, height:10});

world.newOrganism(new Wolf({x:3, y:3}));
world.newOrganism(new Wolf({x:4, y:4}));

world.newOrganism(new Sheep({x:6, y:6}));
world.newOrganism(new Sheep({x:6, y:7}));

world.newOrganism(new Fox({x:8, y:8}));
world.newOrganism(new Fox({x:6, y:7}));

world.newOrganism(new Turtle({x:1, y:2}));
world.newOrganism(new Turtle({x:1, y:3}));

initializeWorld(world);
runGame();

function runGame()
{
    drawWorld(world);
    world.turn();
    setTimeout(runGame, 100);
}



