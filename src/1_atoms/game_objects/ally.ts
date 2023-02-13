import { Rect, Actions } from "../objects/rect"
import p5 from 'p5'

class Ally extends Rect implements Actions {
    // collider_objects: Array<Rect>
    constructor (pos: p5.Vector, size: p5.Vector) {
        super(pos, size)

        // collider_objectの生成
        // collider_objects: Array<Rect>
        // let lst = []
        // for (let item of collider_objects) {
        //     lst.push(item)
        // }
        // this.collider_objects = lst
    }

    right = () => {
        this.set_x(1)
    }

    left = () => {
        this.set_x(-1)
    }

    down = () => {
        this.set_y(1)
    }

    up = () => {
        this.set_y(-1)
    }

    action = (method_name: string) => {
        if (method_name === "right") {
            this.right()
        } else if( method_name ===  "left") {
            this.left()
        } else if( method_name ===  "up") {
            this.up()
        } else if( method_name ===  "down") {
            this.down()
        } else {

        }
    }
}

export{Ally}