import { Rect, Actions } from "../objects/rect"
import { parabola } from "../animations"
import p5 from 'p5'

class JumpStruct {
    x: number
    y: number
    constructor (x: number = 1, y: number = 1) {
        this.x = x
        this.y = y
    }

    set_x = (x: number) => {
        this.x = x
    }

    set_y = (y: number) => {
        this.y = y
    }

    reset = () => {
        this.x = 1
        this.y = 1
    }
}

// animation_state: オブジェクトのアニメーションの状態を指す。 デフォルトで許可された状態: "landing", "jump"
class GameObject extends Rect implements Actions {
    // collider_objects: Array<Rect>
    color: Array<number>
    animation_state: string
    start_codinate: JumpStruct
    constructor (pos: p5.Vector, size: p5.Vector, animation_state: string = "landing", color: Array<number> = [100, 0, 0, 0]) {
        super(pos, size)
        this.color = color
        this.animation_state = animation_state
        this.start_codinate = new JumpStruct()

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
        this.animation_state = "jumping"
        this.set_y(-1)
    }

    // ジャンプ中の右方向の動き
    jump_right = () => {
        const parabola_value = parabola(13, this.start_codinate.x, 45).mul(-1)
        this.start_codinate.set_x(this.start_codinate.x + 1)
        this.set_x(1)
        this.set_y(parabola_value.truncated().toNumber())
    }


    // ジャンプ中の左方向の動き
    jump_left = () => {
        const parabola_value = parabola(13, this.start_codinate.x, 45).mul(-1)
        this.start_codinate.set_x(this.start_codinate.x + 1)
        this.set_x(-1)
        this.set_y(parabola_value.truncated().toNumber())
    }

    // ジャンプ中にキー入力がない場合の動き    
    in_jump = () => {
        const parabola_value = parabola(13, this.start_codinate.x, 45).mul(-1)
        this.start_codinate.set_x(this.start_codinate.x + 1)
        this.set_y(parabola_value.truncated().toNumber())
    }

    // なんらかのオブジェクトにあったときの動き
    collided = () => {
        this.animation_state = "landing"
    }

    change_color (color: Array<number>) {
        this.color = color
    }

    action = (method_name: string) => {
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
            } else if( method_name ===  "left") {
                this.jump_left()
            } else {
                this.in_jump()
            }
        }
    }
}

export{GameObject}