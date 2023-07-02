import { Rect, Actions } from "../objects/rect"
import { JumpStruct, LandingStruct, Status } from "../animations"
import p5 from 'p5'

// animation_state: オブジェクトのアニメーションの状態を指す。 デフォルトで許可された状態: "landing", "jump"
class GameObject extends Rect implements Actions {
    // collider_objects: Array<Rect>
    color: Array<number>
    condition: Status

    constructor(pos: p5.Vector, size: p5.Vector, color: Array<number> = [100, 0, 0, 0]) {
        super(pos, size)
        this.color = color
        this.condition = new LandingStruct()

        // collider_objectの生成
        // collider_objects: Array<Rect>
        // let lst = []
        // for (let item of collider_objects) {
        //     lst.push(item)
        // }
        // this.collider_objects = lst
    }

    get start() {
        return {x: this.min_x, y: this.min_y}
    }

    get end() {
        return {x: this.max_x, y: this.max_y}
    }

    right = () => {
        const parabola_value = this.condition.confirm_dependent_function("right")
        this.set_x(parabola_value.x.truncated().toNumber())
        this.set_y(parabola_value.y.truncated().toNumber())
    }

    left = () => {
        const parabola_value = this.condition.confirm_dependent_function("left")
        this.set_x(parabola_value.x.truncated().toNumber())
        this.set_y(parabola_value.y.truncated().toNumber())
    }

    down = () => {
        const parabola_value = this.condition.confirm_dependent_function("down")
        this.set_x(parabola_value.x.truncated().toNumber())
        this.set_y(parabola_value.y.truncated().toNumber())
    }

    up = () => {
        const parabola_value = this.condition.confirm_dependent_function("up")
        this.set_x(parabola_value.x.truncated().toNumber())
        this.set_y(parabola_value.y.truncated().toNumber())
        this.condition = this.condition.handler()
    }

    // なんらかのオブジェクトにあったときの動き
    collided = () => {
        this.condition = this.condition.handler("landing")
    }

    change_color(color: Array<number>) {
        this.color = color
    }

    action = (method_name: string) => {
        if (method_name === "right") {
            this.right()
        } else if (method_name === "left") {
            this.left()
        } else if (method_name === "up") {
            this.up()
        } else if (method_name === "down") {
            this.down()
        } else {
            this.down()
        }
    }
}

export { GameObject }