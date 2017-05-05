function WrongCoordinatesException(name){
    this.message = 'Wrong coordinates given for ' + name;
    this.name = 'WrongCoordinatesException';
}

export { WrongCoordinatesException }