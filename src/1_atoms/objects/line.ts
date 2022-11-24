import { Substance } from './substance'
import p5 from 'p5'

class Line extends Substance {
    constructor( pos: p5.Vector, size: p5.Vector, ) {
        super(pos, size);
    }
}


export{Line}