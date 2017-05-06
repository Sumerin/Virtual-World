function WrongCoordinatesException(name){
    this.message = 'Wrong coordinates given for ' + name;
}

function WrongSizeGivenException(){
    this.message = 'Wrong world size was given';
}

function OutOfRangeException(pos){
    this.message = 'Given coordinates ['+pos.x+','+pos.y+'] are out of range';
}

function NoWorldAssignedException(name){
    this.message = 'No world assigned for ' + name;
}

function NoMethodImplementedException(name){
    this.message = 'No ' + name + ' method implemented';
}

function WrongOrganismIdWhileDeletingException(organism){
    this.message = 'Wrong organism id';
    this.organism = organism;
    this.expected = organism.world.organisms[organism.index];
}

export { WrongCoordinatesException,  WrongSizeGivenException, OutOfRangeException, NoWorldAssignedException, NoMethodImplementedException, WrongOrganismIdWhileDeletingException}