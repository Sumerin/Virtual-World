import "./style.scss";
import Wolf from './organisms/animals/wolf';
import Sheep from './organisms/animals/sheep'
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

let sheep1= new Sheep({
    x:6,
    y:6
});
world.newOrganism(sheep1);

let sheep2= new Sheep({
    x:6,
    y:7
});
world.newOrganism(sheep2);

initializeWorld(world);
runGame();

function runGame()
{
    drawWorld(world);
    world.turn();
    setTimeout(runGame, 100);
}



