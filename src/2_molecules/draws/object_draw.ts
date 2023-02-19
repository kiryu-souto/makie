import p5 from 'p5'
import * as substance from './../../1_atoms/objects/substance'
import * as text from './../../1_atoms/objects/text'
import * as line from './../../1_atoms/objects/line'
import * as rect from './../../1_atoms/objects/rect'
import {GameObject} from './../../1_atoms/game_objects/game_object'

function origin_draw (
    p: p5, lst: substance.Substance[]
  ) {
    for (let item of lst) {
      if (item instanceof text.Text) {
        p.text(item.content, item.pos.x, item.pos.y)
      } else if (item instanceof GameObject) {
        const color_arr = item.color
        const color_str = 'rgba(' + color_arr[0].toString() + ',' + color_arr[1].toString() + ',' + color_arr[2].toString() + ',' + color_arr[3].toString() + ')'
        p.fill(color_str)
        p.rect(item.pos.x, item.pos.y, item.size.x, item.size.y)
      } else if (item instanceof line.Line) {
        p.line(item.pos.x, item.pos.y, item.size.x, item.size.y)
      } else if (item instanceof rect.Rect) {
        p.fill(0)
        p.rect(item.pos.x, item.pos.y, item.size.x, item.size.y)
      } 
    }
}

export {origin_draw}