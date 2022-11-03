import p5 from 'p5'
import * as substance from './../../1_atoms/objects/substance'
import * as text from './../../1_atoms/objects/text'

function origin_draw (
    p: p5, lst: substance.Substance[]
  ) {
    for (let item of lst) {
      if (item instanceof text.Text) {
        p.text(item.content, item.x, item.y)
      }
    }
}

export {origin_draw}