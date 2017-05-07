import "./style.scss";
import Wolf from './organisms/animals/wolf';
import Sheep from './organisms/animals/sheep';
import Fox from './organisms/animals/fox'
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



let fox1= new Fox({
    x:8,
    y:8
});
world.newOrganism(fox1);

let fox2= new Fox({
    x:6,
    y:7
});
world.newOrganism(fox2);

initializeWorld(world);
runGame();

function runGame()
{
    drawWorld(world);
    world.turn();
    setTimeout(runGame, 100);
}



