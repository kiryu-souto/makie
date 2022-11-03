import './substance'
import { Substance } from './substance'

class Text extends Substance {
    content: String
    constructor( x: number, y: number, content: String) {
        super(x, y);
        this.content = content
    }
}


export{Text}