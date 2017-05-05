import {WrongCoordinatesException} from '../errors';

export default class Organism{
    constructor(coordinates){
        this.strength=0;
        this.initiative=0;
        this.world=0;
        this.coordinates = coordinates;

        if(coordinates.x == null || coordinates.y == null){
            throw new WrongCoordinatesException(this.constructor.name);
        }
    }
}