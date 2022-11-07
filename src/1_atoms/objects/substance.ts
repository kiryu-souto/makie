import p5 from 'p5'

class Substance {
    pos: p5.Vector
    size: p5.Vector
    constructor( pos: p5.Vector, size: p5.Vector) {
        this.pos = pos
        this.size = size
    }
}

export {Substance}