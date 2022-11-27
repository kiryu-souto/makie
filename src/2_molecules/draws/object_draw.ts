import p5 from 'p5'
import * as substance from './../../1_atoms/objects/substance'
import * as text from './../../1_atoms/objects/text'
import * as line from './../../1_atoms/objects/line'
import * as rect from './../../1_atoms/objects/rect'

function origin_draw (
    p: p5, lst: substance.Substance[]
  ) {
    for (let item of lst) {
      if (item instanceof text.Text) {
        p.text(item.content, item.pos.x, item.pos.y)
      } else if (item instanceof line.Line) {
        p.line(item.pos.x, item.pos.y, item.size.x, item.size.y)
      } else if (item instanceof rect.Rect) {
        p.rect(item.pos.x, item.pos.y, item.size.x, item.size.y)
      }
    }
}

export {origin_draw}