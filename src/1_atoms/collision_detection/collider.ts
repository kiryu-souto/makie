import p5 from 'p5'
import { matrix, subtract } from 'mathjs'

export class Bottom {}
export class Top {}
export class None {}
export class Right {}
export class Left {}
export class Inside {}

type Collision = Bottom | Top | None | Right | Left | Inside

// ((a_pos.x - a_size.x) / 2 <= x[n] <= (a_pos.x + a_size.x) / 2) && ((a_pos.y - a_size.y) / 2 <= y[n] <= (a_pos.y + a_size.y) / 2)

function square_collide(a_pos: p5.Vector, a_size: p5.Vector, b_pos: p5.Vector, b_size: p5.Vector): Collision {
    let new_a_pos = new p5.Vector(a_pos.x, a_pos.y)
    let new_a_size = new p5.Vector(a_size.x, a_size.y)
    let new_b_pos = new p5.Vector(b_pos.x, b_pos.y)
    let new_b_size = new p5.Vector(b_size.x, b_size.y)

    let lst_b_point = [[new_b_pos.x, new_b_pos.y], 
                       [new_b_pos.x, new_b_pos.y + new_b_size.y],
                       [new_b_pos.x + new_b_size.y, new_b_pos],
                       [new_b_pos.x + new_b_size.y, new_b_pos.y + new_b_size.y]]
    for (let lst_item of lst_b_point) {
        if ((new_a_pos.x <= lst_item[0]  &&
              lst_item[0] <= new_a_pos.x + new_a_size.x && 
              new_a_pos.y <= lst_item[1] && 
              lst_item[1] <= new_a_pos.y + new_a_size.y)) {
            return new Inside()
        }
    }

    return new None()
}

// arrの符号化を行う
// Arrayはanyが引数になっているためanyにする。
function plus_minus_encode (arr: Array<any>): Array<boolean> {
    let ans : boolean[] = []
    for (let item of arr) {
        if (item >= 0) {
            ans.push(true)
        } else {
            ans.push(false)
        }
    }
    return ans
}

// 0,1と2,3にxorを実行する。その結果をandで出力する
function encode2 (arr: boolean[][]) : number {
    // ( a || b ) && !( a && b )
    const ans: number[] = arr.map(item => {
        const ans1: boolean = (item[0] || item[1]) && !(item[0] && item[1])
        const ans2: boolean = (item[2] || item[3]) && !(item[2] && item[3])
        return ans1 && ans2 ? 1 : 0
    })
    return ans.reduce((accumulator, currentValue) => accumulator + currentValue,0)
}

function new_square_collide(a_start: p5.Vector, a_end: p5.Vector, b_start: p5.Vector, b_end: p5.Vector): number {
    const test = matrix([b_start.x, b_end.x, b_start.y, b_end.y])
    let test2 = subtract(test, matrix([a_start.x, a_end.x, a_start.y, a_end.y]))
    console.log([plus_minus_encode(test2.toArray())])
    return encode2([plus_minus_encode(test2.toArray())])
}

export {square_collide, new_square_collide}
export type {Collision}