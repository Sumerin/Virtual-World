import $ from 'jquery';

export default class View {
    constructor(world){
        this.world = world;
    }

    initialize() {
        this.map = $('#map');
        this.rows = [];

        for (let y = 0; y < this.world.size.height; y++) {
            let row = $('<div/>', {
                class: 'row',
            });
            for (let x = 0; x < this.world.size.width; x++) {
                let className = 'empty';
                let el = $('<div/>', {
                    class: 'element ' + className
                });
                el.on('click', () => {
                    this.checkContent({x: x, y: y}, el)
                });
                row.append(el);
            }
            this.map.append(row);
            this.rows.push(row[0]);
        }
        this.changes = [];
    }

    checkContent(pos, node){
        console.debug({
            pos:pos,
            organism:this.world.getMapState(pos),
            node:node,
            world: this.world
        })
    }
    draw(){
        for(let y=0; y<this.world.size.height; y++){
            let elements = this.rows[y].childNodes;
            for(let x=0; x<this.world.size.width; x++){
                let obj = this.world.getMapState({x:x, y:y});
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
    change(pos,obj){
        let el = this.rows[pos.y].childNodes[pos.x];
        let className;
        if (obj){
            className = obj.constructor.name;
        }else{
            className = 'empty';
        }
        this.changes.push({
            el:el,
            newClass: 'element ' + className
        })
    }
    applyChanges(){
        this.changes.forEach(change=>{
            change.el.className = change.newClass;
        })
    }
}