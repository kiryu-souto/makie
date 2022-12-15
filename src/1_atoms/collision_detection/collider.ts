import p5 from 'p5'

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

// arrの符号化を行う
// Arrayはanyが引数になっているためanyにする。
// function boolean_encode (arr: Array<any>): Array<boolean> {
//     return arr.map(item => { return item >= 0 ? true : false})
// }

// 0,1と2,3にxorを実行する。その結果をandで出力する
// function xor_encode (arr: boolean[][]) : number {
//     const ans: number[] = arr.map(item => {
//         const ans1: boolean = (item[0] || item[1]) && !(item[0] && item[1])
//         const ans2: boolean = (item[2] || item[3]) && !(item[2] && item[3])
//         return ans1 && ans2 ? 1 : 0
//     })
//     return ans.reduce((accumulator, currentValue) => accumulator + currentValue,0)
// }

// 線と線の当たり判定用の関数
function new_square_collide(a_start: p5.Vector, a_end: p5.Vector, b_start: p5.Vector, b_end: p5.Vector): Collision {

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


    console.log("x",a_max_x, a_min_x, b_max_x, b_min_x)
    console.log("y", a_max_y, a_min_y, b_max_y, b_min_y)

    let x_collision: Collision = new Inside()
    let y_collision: Collision = new Inside()
    let x_depth = 0
    let y_depth = 0

    if ((a_min_x < b_max_x && a_max_x > b_min_x) && (a_min_y < b_max_y && a_max_y > b_min_y)) {
        // a_min.x < b_min.x && a_max.x > b_min.x && a_max.x < b_max.x
        // b_min.x - a_max.x
        // Collision::Left
        if ((a_min_x < b_min_x && a_max_x > b_min_x) && a_max_x < b_max_x) {
            x_collision = new Left()
            x_depth = Math.abs(b_min_x - a_max_x)
            // a_min.x > b_min.x && a_min.x < b_max.x && a_max.x > b_max.x
            // Collision::Right
            // a_min.x - b_max.x
        } else if((a_min_x > b_min_x && a_min_x < b_max_x) && a_max_x > b_max_x) {
            x_collision = new Right()
            x_depth = Math.abs(a_min_x - b_max_x)
        } else {
            x_collision = new Inside()
        }

        // a_min.y < b_min.y && a_max.y > b_min.y && a_max.y < b_max.y
        // Collision::Bottom
        // b_min.y - a_max.y
        if ((a_min_y < b_min_y && a_max_y > b_min_y) && a_max_y < b_max_y) {
            y_collision = new Bottom()
            y_depth = Math.abs(b_min_y - a_max_y)
            // a_min.y > b_min.y && a_min.y < b_max.y && a_max.y > b_max.y 
            // a_min.y - b_max.y
        } else if ((a_min_y > b_min_y && a_min_y < b_max_y) && a_max_y > b_max_y) {
            y_collision = new Top()
            y_depth = Math.abs(a_min_y - b_max_y)
        } else {
            x_collision = new Inside()
        }
        console.log("depth", x_depth, y_depth)
        
        if ( y_depth < x_depth ) {
            return x_collision
        } else {
            return y_collision
        }

    } else {
        return new None()
    }
    
}

export {square_collide, new_square_collide}
export type {Collision}