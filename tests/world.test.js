import World from '../app/world'
import Wolf from '../app/organisms/animals/wolf'

test('Check if created organism is on its place', () => {
    let world = new World({width:20, height:20});
    let pos = {x:3, y:3};
    world.newOrganism(new Wolf(pos));
    expect(world.getMapState(pos).constructor.name)
        .toBe('Wolf');

    let node = world.view.rows[pos.y].childNodes[pos.x];
    expect(node.className)
        .toBe('element empty');
    world.view.applyChanges();
    expect(node.className)
        .toBe('element Wolf');
});