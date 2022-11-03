import p5 from 'p5'

class Text {
    x: number
    y: number
    content: String
    constructor( x: number, y: number, content: String) {
        this.x = x
        this.y = y
        this.content = content
    }
}

function text_draw (p: p5, text_lst: Text[]) {
    for (let text of text_lst) {
      p.text(text.content, text.x, text.y)
    }
  }

export{Text, text_draw}