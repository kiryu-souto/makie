import { GameObject } from "./game_object"
import p5 from 'p5'

class Ally extends GameObject {
    // collider_objects: Array<Rect>
    constructor (pos: p5.Vector, size: p5.Vector) {
        super(pos, size)
        // this.action = (method_name: string) => {
        //     if (method_name === "right") {
        //         this.right()
        //     } else if( method_name ===  "left") {
        //         this.left()
        //     } else if( method_name ===  "up") {
        //         this.up()
        //     } else if( method_name ===  "down") {
        //         this.down()
        //     } else {
    
        //     }
        // }

        // collider_objectの生成
        // collider_objects: Array<Rect>
        // let lst = []
        // for (let item of collider_objects) {
        //     lst.push(item)
        // }
        // this.collider_objects = lst
    }

    action = (method_name: string) => {
        if (method_name ==="collided") {
            this.collided()
        }
        
        if(this.animation_state == "landing") {
            if (method_name === "right") {
                this.right()
            } else if( method_name ===  "left") {
                this.left()
            } else if( method_name ===  "up") {
                this.up()
            } else if( method_name ===  "down") {
                this.down()
            }
        } else if(this.animation_state == "jumping") {
            if (method_name === "right") {
                this.jump_right()
            } else if(method_name ===  "left") {
                this.jump_left()
            } else if( method_name ===  "down") {
                this.in_jump()
            }
        }
    }
}

export{Ally}