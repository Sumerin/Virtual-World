import "./style.scss";
import Wolf from './organisms/animals/wolf';
import Sheep from './organisms/animals/sheep';
import Fox from './organisms/animals/fox';
import Turtle from './organisms/animals/turtle';
import Antelope from './organisms/animals/antelope';
import Human from './organisms/animals/human';

import Guarana from './organisms/plants/guarana';
import Grass from './organisms/plants/grass';
import SowThistle from './organisms/plants/sowThistle';
import PoisonBerry from './organisms/plants/poisonBerry';

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

world.newOrganism(new Grass({x:3, y:4}));
world.newOrganism(new Grass({x:7, y:7}));

world.newOrganism(new Guarana({x:1, y:1}));
world.newOrganism(new Guarana({x:19, y:19}));

world.newOrganism(new SowThistle({x:15, y:17}));
world.newOrganism(new SowThistle({x:15, y:18}));

world.newOrganism(new PoisonBerry({x:16, y:16}));
world.newOrganism(new PoisonBerry({x:16, y:17}));

world.newOrganism(new Human({x:18, y:18}));

world.start();




