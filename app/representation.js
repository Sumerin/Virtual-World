import $ from 'jquery';

function initializeWorld(world){
    let map = $('#map');
    for(let y=0; y<world.size.height; y++){
        let row = $('<div/>', {
            class: 'row',
        });
        for(let x=0; x<world.size.width; x++){
            let className = 'empty';
            let el = $('<div/>', {
                class: 'element ' + className
            });
            row.append(el);
        }
        map.append(row);
    }
}

function drawWorld(world){
    let map = $('#map');
    let rows = map.find('.row');
    for(let y=0; y<world.size.height; y++){
        let elements = rows[y].childNodes;
        for(let x=0; x<world.size.width; x++){
            let obj = world.getMapState({x:x, y:y});
            let className;
            if (obj){
                className = obj.constructor.name;
            }else{
                className = 'empty';
            }
            elements[x].className = 'element ' + className;
        }
    }
}

export { drawWorld, initializeWorld }