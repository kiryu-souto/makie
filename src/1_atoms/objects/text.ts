import './substance'
import { Substance } from './substance'
import p5 from 'p5'

class Text extends Substance {
    content: String
    constructor( pos: p5.Vector, size: p5.Vector, content: String) {
        super(pos, size);
        this.content = content
    }
}


export{Text}