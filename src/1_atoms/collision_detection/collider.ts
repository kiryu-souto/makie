import p5 from 'p5'
import { Rect } from './../objects/rect'
// import {matrix, subtract} from 'mathjs'

export class Bottom {}
export class Top {}
export class None {}
export class Right {}
export class Left {}
export class Inside {}

type Collision = Bottom | Top | None | Right | Left | Inside


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



function point_array_func (pos_vec: p5.Vector, size_vec: p5.Vector) : p5.Vector[] {
    return [pos_vec, 
        p5.Vector.add(pos_vec, new p5.Vector(size_vec.x, 0,0)),
        p5.Vector.add(pos_vec, new p5.Vector(size_vec.x, size_vec.y,0)),
        p5.Vector.add(pos_vec, new p5.Vector(0, size_vec.y,0))]
}

function new_square_collide(a_start: p5.Vector, a_end: p5.Vector, b_start: p5.Vector, b_end: p5.Vector): String {

    // Xの最大値と最小値をaとbの四角形から算出
    const a_max_x = Math.max(...point_array_func(a_start, a_end).map((item) => {
        return item.x
    }))
    const a_min_x = Math.min(...point_array_func(a_start, a_end).map((item) => {
        return item.x
    }))
    const b_max_x = Math.max(...point_array_func(b_start, b_end).map((item) => {
        return item.x
    }))
    const b_min_x = Math.min(...point_array_func(b_start, b_end).map((item) => {
        return item.x
    }))

    // Yの最大値と最小値をaとbの四角形から算出
    const a_max_y = Math.max(...point_array_func(a_start, a_end).map((item) => {
        return item.y
    }))
    const a_min_y = Math.min(...point_array_func(a_start, a_end).map((item) => {
        return item.y
    }))
    const b_max_y = Math.max(...point_array_func(b_start, b_end).map((item) => {
        return item.y
    }))
    const b_min_y = Math.min(...point_array_func(b_start, b_end).map((item) => {
        return item.y
    }))



    if ((a_min_x < b_max_x && a_max_x > b_min_x) && (a_min_y < b_max_y && a_max_y > b_min_y)) {
        return "inside"
    } else {
        return "none"
    }
    
}

function new_square_collide_2 (a_rect: Rect, b_rect: Rect) {
        if ((a_rect.min_x <= b_rect.max_x && a_rect.max_x >= b_rect.min_x) && (a_rect.min_y < b_rect.max_y && a_rect.max_y > b_rect.min_y)) {
            return "inside"
        } else {
            return "none"
        }
}

export {square_collide, new_square_collide, new_square_collide_2}
export type {Collision}

// 線と線の当たり判定用の関数
// この関数は複数の四角形がある場合処理が間に合わない。おそらく計算効率が悪い。
// function new_square_collide(a_start: p5.Vector, a_end: p5.Vector, b_start: p5.Vector, b_end: p5.Vector): Collision {

//     // Xの最大値と最小値をaとbの四角形から算出
//     const a_max_x = Math.max(...point_array_func(a_start, a_end).map((item) => {
//         return item.x
//     }))
//     const a_min_x = Math.min(...point_array_func(a_start, a_end).map((item) => {
//         return item.x
//     }))
//     const b_max_x = Math.max(...point_array_func(b_start, b_end).map((item) => {
//         return item.x
//     }))
//     const b_min_x = Math.min(...point_array_func(b_start, b_end).map((item) => {
//         return item.x
//     }))

//     // Yの最大値と最小値をaとbの四角形から算出
//     const a_max_y = Math.max(...point_array_func(a_start, a_end).map((item) => {
//         return item.y
//     }))
//     const a_min_y = Math.min(...point_array_func(a_start, a_end).map((item) => {
//         return item.y
//     }))
//     const b_max_y = Math.max(...point_array_func(b_start, b_end).map((item) => {
//         return item.y
//     }))
//     const b_min_y = Math.min(...point_array_func(b_start, b_end).map((item) => {
//         return item.y
//     }))



//     if ((a_min_x < b_max_x && a_max_x > b_min_x) && (a_min_y < b_max_y && a_max_y > b_min_y)) {
//         return new Inside()
//         // // a_min.x < b_min.x && a_max.x > b_min.x && a_max.x < b_max.x
//         // // b_min.x - a_max.x
//         // // Collision::Left
//         // if ((a_min_x < b_min_x && a_max_x > b_min_x) && a_max_x < b_max_x) {
//         //     x_collision = new Left()
//         //     x_depth = Math.abs(b_min_x - a_max_x)
//         //     // a_min.x > b_min.x && a_min.x < b_max.x && a_max.x > b_max.x
//         //     // Collision::Right
//         //     // a_min.x - b_max.x
//         // } else if((a_min_x > b_min_x && a_min_x < b_max_x) && a_max_x > b_max_x) {
//         //     x_collision = new Right()
//         //     x_depth = Math.abs(a_min_x - b_max_x)
//         // } else {
//         //     x_collision = new Inside()
//         // }

//         // // a_min.y < b_min.y && a_max.y > b_min.y && a_max.y < b_max.y
//         // // Collision::Bottom
//         // // b_min.y - a_max.y
//         // if ((a_min_y < b_min_y && a_max_y > b_min_y) && a_max_y < b_max_y) {
//         //     y_collision = new Bottom()
//         //     y_depth = Math.abs(b_min_y - a_max_y)
//         //     // a_min.y > b_min.y && a_min.y < b_max.y && a_max.y > b_max.y 
//         //     // a_min.y - b_max.y
//         // } else if ((a_min_y > b_min_y && a_min_y < b_max_y) && a_max_y > b_max_y) {
//         //     y_collision = new Top()
//         //     y_depth = Math.abs(a_min_y - b_max_y)
//         // } else {
//         //     x_collision = new Inside()
//         // }
//         // console.log("depth", x_depth, y_depth)
        
//         // if ( y_depth < x_depth ) {
//         //     return x_collision
//         // } else {
//         //     return y_collision
//         // }

//     } else {
//         return new None()
//     }
    
// }


// rubbish_code

// function point_array_func (pos_vec: p5.Vector, size_vec: p5.Vector) : p5.Vector[] {
//     return [pos_vec, 
//         p5.Vector.add(pos_vec, new p5.Vector(size_vec.x, 0,0)),
//         p5.Vector.add(pos_vec, new p5.Vector(size_vec.x, size_vec.y,0)),
//         p5.Vector.add(pos_vec, new p5.Vector(0, size_vec.y,0))]
// }

// 四角形の座標とサイズから線データの配列を生成する
// function line_vector (pos_vec: p5.Vector, size_vec: p5.Vector) : number[][] {
//     const point_array = [pos_vec, 
//                         p5.Vector.add(pos_vec, new p5.Vector(size_vec.x, 0,0)),
//                         p5.Vector.add(pos_vec, new p5.Vector(size_vec.x, size_vec.y,0)),
//                         p5.Vector.add(pos_vec, new p5.Vector(0, size_vec.y,0))]
//     return point_array.map((item, index, arr) => {
//         return index < arr.length - 1 ? [item.x, arr[index + 1].x, item.y,  arr[index + 1].y] : [item.x, arr[0].x, item.y, arr[0].y]
//     })
// }

// ここの処理は間違えている。行列式の加算、減算は行列の数が同じでないと成立しない。
// 乗算、除算の場合、行の数がk>=vでないと成り立たない。明らかに計算を間違えている。
// 参考資料: https://www.krrk0.com/matrix-addition-subtraction/
// function test_subtract (a_matrix: number[][], b_matrix: number[] ) : number[][] {
//     return a_matrix.map(function(a_item): number[] {
//         return a_item.map(function(value, index): number {
//             return value - b_matrix[index]
//         }) 
//     })
// }

// 行を任意の数で行列式に変換する
// line: 複製する行の要素
// column_num: 列数
// function create_array(line_item:number[], column_num: number): number[][] {
//     let arr: number[][] = [];
//     for (let index = 0; index < column_num; index++) {
//         arr.push(line_item)        
//     }
//     return arr
// }

// 自身の当たり判定処理
// function new_square_collide(a_start: p5.Vector, a_end: p5.Vector, b_start: p5.Vector, b_end: p5.Vector): Collision {
// console.log("line_vectors",line_vectors)
// console.log("create_array",create_array([a_start.x, a_end.x, a_start.y, a_end.y], line_vectors.length))
// console.log("substract", subtract(matrix(line_vectors), 
//                          matrix(create_array([a_start.x, a_end.x, a_start.y, a_end.y], line_vectors.length))
//             ))
// console.log("test_calc_matrix", "substract", subtract(matrix(line_vectors), 
//                 matrix(create_array([a_start.x, a_end.x, a_start.y, a_end.y], line_vectors.length))
//             ).toArray().map(value => {return value.valueOf()}))
// console.log(test_subtract(line_vectors, [a_start.x, a_end.x, a_start.y, a_end.y]))
// const test_calc_matrix = test_subtract(line_vectors, [a_start.x, a_end.x, a_start.y, a_end.y])
// console.log(xor_encode( test_calc_matrix.map(function(item) { return boolean_encode(item) })))
// }