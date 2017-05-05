function WrongCoordinatesException(name){
    this.message = 'Wrong coordinates given for ' + name;
}

function WrongSizeGivenException(){
    this.message = 'Wrong world size was given';
}

function OutOfRangeException(pos){
    this.message = 'Given coordinates ['+pos.x+','+pos.y+'] are out of range';
}

function NoWorldAssigned(name){
    this.message = 'No world assigned for ' + name;
}

function NoMethodImplemented(name){
    this.message = 'No ' + name + ' method implemented';
}

export { WrongCoordinatesException,  WrongSizeGivenException, OutOfRangeException, NoWorldAssigned, NoMethodImplemented }