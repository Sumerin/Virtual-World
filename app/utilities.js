function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Direction is resembled by a number on numpad, so for example
//7 means moving to upper-left corner, or 6 means moving right
function getPosAtDir(pos,dir){
    if(dir==5){
        return pos;
    }
    let x = pos.x;
    let y = pos.y;
    if(dir>=1 && dir<=3) {
        ++y;
    }else if(dir>=7 && dir<=9){
        --y;
    }
    if(dir==1||dir==4||dir==7){
        --x;
    }else if(dir==9||dir==6||dir==3){
        ++x;
    }
    return {
        x:x,
        y:y
    }
}

function tryWithChance(prob) {
    let outcome = Math.random();
    return outcome <= prob/100;
}

export { getRandom, getPosAtDir, tryWithChance }