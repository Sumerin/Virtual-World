import "./style.scss";
import Wolf from './organisms/animals/wolf';
import Sheep from './organisms/animals/sheep';
import Fox from './organisms/animals/fox';
import Turtle from './organisms/animals/turtle';
import Antelope from './organisms/animals/antelope';
import World from './world';

let world = new World({width:20, height:20});

world.newOrganism(new Wolf({x:3, y:3}));
world.newOrganism(new Wolf({x:4, y:4}));

world.newOrganism(new Sheep({x:15, y:15}));
world.newOrganism(new Sheep({x:15, y:16}));

world.newOrganism(new Fox({x:8, y:8}));
world.newOrganism(new Fox({x:6, y:7}));

world.newOrganism(new Turtle({x:1, y:2}));
world.newOrganism(new Turtle({x:1, y:3}));

world.newOrganism(new Antelope({x:1, y:15}));
world.newOrganism(new Antelope({x:1, y:16}));

world.runGame();




