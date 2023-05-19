// import p5 from 'p5'
import { bunkatu, parabola, coefficient_of_kinetic_frinction } from 'gedux'
import { Decimal } from 'decimal.js'


/**
 * @jest-environment node
 */
// test('当たり判定', function () {
//     const test_value = colliders.square_collide(
//         new p5.Vector(0, 0), 
//         new p5.Vector(20, 10),
//         new p5.Vector(10, 5),
//         new p5.Vector(20, 10))
//     expect(test_value.constructor).toBe(colliders.Inside);
// });

test('分割', function () {
    const test_value = bunkatu(new Decimal(0), new Decimal(10), 10)
    expect(test_value).toEqual(new Decimal(11))
})

// 式:      tan(cita)x - g x^2 / 2(v0 * cos (cita)) ^ 2
// v0:      初速
// x:       xの初期座標
// cita:    角度
// grabity: 万有引力定数
test('放物線', function () {
    const test_value = parabola(10, 1, 45, new Decimal(6.708))
    expect(test_value.truncated()).toEqual(new Decimal(1))
})

// test('当たり判定', function () {
//     const test_func = (i: number) => {return i}
//     const test_value = sekibun(test_func, 10)
//     expect(test_value).toBe(10);
// })

// 式: f"k" = u"k" * N
describe("動摩擦係数計算", () => {
    test("通常ケース", function () {
        const test_value = coefficient_of_kinetic_frinction(10, 0.1, 10)
        expect(test_value).toBe(9)
    })
})
