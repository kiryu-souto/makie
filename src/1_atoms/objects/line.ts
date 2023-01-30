import { Substance } from './substance'
import p5 from 'p5'

class Line extends Substance {
    max_y: number
    max_x: number
    min_y: number
    min_x: number
    
    constructor( pos: p5.Vector, size: p5.Vector, ) {
        super(pos, size)
        this.max_y = Math.max(...[pos.y, pos.y + pos.y])
        this.min_y = Math.min(...[pos.y, pos.y + pos.y])
        this.max_x = Math.max(...[pos.x, pos.x + size.x])
        this.min_x = Math.min(...[pos.x, pos.x + size.x])
    }
}


export{Line}