import { Substance } from './substance'
import p5 from 'p5'

class Rect extends Substance {
    constructor( pos: p5.Vector, size: p5.Vector, ) {
        super(pos, size);
    }
}


export{Rect}