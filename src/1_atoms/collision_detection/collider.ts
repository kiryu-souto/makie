import p5 from 'p5'

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

    // let a_min = new_a_pos.sub(new_a_size.x, new_a_size.y).div(2)
    // let a_max = new_a_pos.add(new_a_size.x, new_a_size.y).div(2)

    // let b_min = new_b_pos.sub(new_b_size.x, new_b_size.y).div(2)
    // let b_max = new_b_pos.add(new_b_size.x, new_b_size.y).div(2)

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


    // const div_new_a_size = new_a_size.div(2)
    // const div_new_b_size = new_b_size.div(2)

    // let a_min = new_a_pos.sub(div_new_a_size.x, div_new_a_size.y)
    // let a_max = new_a_pos.add(div_new_a_size.x, div_new_a_size.y)

    // let b_min = new_b_pos.sub(div_new_b_size.x, div_new_b_size.y)
    // let b_max = new_b_pos.add(div_new_b_size.x, div_new_b_size.y)

    // let x_collision
    // let y_collision
    // let x_depth
    // let y_depth

    // if (a_min.x < b_max.x && a_max.x > b_min.x && a_min.y < b_max.y && a_max.y > b_min.y) {
    //     if (a_min.x < b_min.x && a_max.x > b_min.x && a_max.x < b_max.x) {
    //         x_collision = new Right()
    //         x_depth = a_max.x - b_min.x
    //     } else if (a_min.x > b_min.x && a_min.x < b_max.x && a_max.x > b_max.x) {
    //         x_collision = new Left()
    //         x_depth = b_max.x - a_min.x
    //     } else {
    //         x_collision = new Inside
    //         x_depth = -Infinity
    //     }

    //     if (a_min.y < b_min.y && a_max.y > b_min.y && a_max.y < b_max.y) {
    //         y_collision = new Bottom()
    //         y_depth = a_max.y - b_min.y
    //     } else if (a_min.y > b_min.y && a_min.y < b_max.y && a_max.y > b_max.y) {
    //         y_collision = new Top()
    //         y_depth = b_max.y - a_min.y
    //     } else {
    //         y_collision = new Inside()
    //         y_depth = -Infinity
    //     }

    //     if (y_depth < x_depth ) {
    //         return y_collision
    //     } else {
    //         return x_collision
    //     }
    // } else {
    //     return new None()
    // }
}

// pub fn square_collide(a_pos: Vec3, a_size: Vec2, b_pos: Vec3, b_size: Vec2) -> Option<Collision> {
//     let a_min = a_pos.truncate() - a_size / 2.0;
//     let a_max = a_pos.truncate() + a_size / 2.0;

//     let b_min = b_pos.truncate() - b_size / 2.0;
//     let b_max = b_pos.truncate() + b_size / 2.0;

//     // check to see if the two rectangles are intersecting
//     if a_min.x < b_max.x && a_max.x > b_min.x && a_min.y < b_max.y && a_max.y > b_min.y {
//         // check to see if we hit on the left or right side
//         let (x_collision, x_depth) = if a_min.x < b_min.x && a_max.x > b_min.x && a_max.x < b_max.x
//         {
//             (Collision::Left, b_min.x - a_max.x)
//         } else if a_min.x > b_min.x && a_min.x < b_max.x && a_max.x > b_max.x {
//             (Collision::Right, a_min.x - b_max.x)
//         } else {
//             (Collision::Inside, -f32::INFINITY)
//         };

//         // check to see if we hit on the top or bottom side
//         let (y_collision, y_depth) = if a_min.y < b_min.y && a_max.y > b_min.y && a_max.y < b_max.y
//         {
//             (Collision::Bottom, b_min.y - a_max.y)
//         } else if a_min.y > b_min.y && a_min.y < b_max.y && a_max.y > b_max.y {
//             (Collision::Top, a_min.y - b_max.y)
//         } else {
//             (Collision::Inside, -f32::INFINITY)
//         };

//         // if we had an "x" and a "y" collision, pick the "primary" side using penetration depth
//         if y_depth.abs() < x_depth.abs() {
//             Some(y_collision)
//         } else {
//             Some(x_collision)
//         }
//     } else {
//         None
//     }
// }

export {square_collide}
export type {Collision}