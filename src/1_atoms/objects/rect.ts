import { Substance } from './substance'
import p5 from 'p5'

interface Actions {
    action( method_name: string ): void;
}

class Rect extends Substance {
    id: number
    max_y: number
    max_x: number
    min_y: number
    min_x: number

    constructor( pos: p5.Vector, size: p5.Vector, ) {
        super(pos, size);
        const random_max = 1000
        this.id = Math.random() * random_max
        this.max_y = Math.max(...[pos.y, pos.y + size.y])
        this.min_y = Math.min(...[pos.y, pos.y + size.y])
        this.max_x = Math.max(...[pos.x, pos.x + size.x])
        this.min_x = Math.min(...[pos.x, pos.x + size.x])
    }

    // action = ( method_name: string ) => {
    //     let method = this.constructor.prototype[method_name]
    //     console.log("hello")
    //     console.log(this.constructor.prototype.constructor)
    //     console.log(method)
    //     if (method !== undefined) {
    //         method()
    //     } else {
    //         console.log("not find function")
    //     }
    // }
    
    set_x(x: number) {
        this.pos = new p5.Vector(this.pos.x + x, this.pos.y)
        this.max_x = this.max_x + x
        this.min_x = this.min_x + x
    }

    set_y(y: number) {
        this.pos = new p5.Vector(this.pos.x, this.pos.y + y)
        this.max_y = this.max_y + y
        this.min_y = this.min_y + y
    }

    set_x_y(x:number, y:number) {
        this.set_x(x)
        this.set_y(y)
    }
}


export{Rect}
export type{Actions}