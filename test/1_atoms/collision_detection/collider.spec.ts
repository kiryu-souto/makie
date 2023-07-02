import * as colliders from '../../../src/1_atoms/collision_detection/collider'
import {Rect} from '../../../src/1_atoms/objects/rect'
import p5 from 'p5'

/**
 * @jest-environment node
 */

test('当たり判定', function () {
    const test_value = colliders.new_square_collide(
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
    expect(test_val).toBe('inside')
})

test('境界値当たり判定1', function() {
    const test_val =  colliders.new_square_collide(
        new p5.Vector(0, 380),
        new p5.Vector(30, 20),
        new p5.Vector(0, 350),
        new p5.Vector(200, 30)
    )
    expect(test_val).toBe('none')
})

test('新しい当たり判定', function () {
    const rect_a = new Rect(new p5.Vector(40, 0), new p5.Vector(40, 20))
    const rect_b = new Rect(new p5.Vector(30, 10), new p5.Vector(80, 10))
    const test_val =  colliders.new_square_collide_2(
        rect_a,rect_b
    )
    expect(test_val).toBe('inside')
})

// test('配列計算', function () {
     
// })