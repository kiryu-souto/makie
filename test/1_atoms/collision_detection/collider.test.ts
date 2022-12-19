import * as colliders from '../../../src/1_atoms/collision_detection/collider'
import p5 from 'p5'

/**
 * @jest-environment node
 */

test('当たり判定', function () {
    const test_value = colliders.square_collide(
        new p5.Vector(0, 0), 
        new p5.Vector(20, 10),
        new p5.Vector(10, 5),
        new p5.Vector(20, 10))
    expect(test_value.constructor).toBe(colliders.Inside);
});

test('新しい当たり判定', function () {
    const test_val =  colliders.new_square_collide(
        new p5.Vector(40, 0), 
        new p5.Vector(40, 20),
        new p5.Vector(30, 10),
        new p5.Vector(80, 10)
    )
    expect(test_val.constructor).toBe(colliders.Inside)
})

test('境界値当たり判定1', function() {
    const test_val =  colliders.new_square_collide(
        new p5.Vector(0, 380), 
        new p5.Vector(30, 20),
        new p5.Vector(0, 350),
        new p5.Vector(200, 30)
    )
    expect(test_val.constructor).toBe(colliders.Top)
})

// test('配列計算', function () {
     
// })