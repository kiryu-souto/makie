import './style.css'
import {horizontal_movement, vertical_motion} from './1_atoms/math/game'
import * as text from './1_atoms/objects/text'
import * as line from './1_atoms/objects/line'
import * as rect from './1_atoms/objects/rect'
import * as colliders from './1_atoms/collision_detection/collider'
import * as origin_draw from './2_molecules/draws/object_draw'
import p5 from 'p5'

// object declaration
let test_text_lst = [new text.Text(new p5.Vector(10, 220), new p5.Vector(20, 230) , "hogehoge")]
// let test_line_lst = [new line.Line(new p5.Vector(100, 100), new p5.Vector(200, 300)),
//                     new line.Line(new p5.Vector(0, 300), new p5.Vector(300, 300))]
let test_rect_lst = [new rect.Rect(new p5.Vector(500, 100), new p5.Vector(20, 300)), 
                     new rect.Rect(new p5.Vector(0, 300), new p5.Vector(200, 30))]


const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400)
  }

  p.draw = () => {
    p.background(255);
    if (p.mouseIsPressed) {
      
      let test = false
      p.fill(0)

      for (let text of test_text_lst) {
        
        for (let line of test_rect_lst) {

          if ( ( colliders.square_collide(text.pos, text.size, line.pos, line.size) instanceof colliders.Inside ) ) {
            test = true
          }

        }

        if (test == false) {
          text.pos.x = text.pos.x + horizontal_movement(10, 1)
        }

      }

    } else if (p.keyIsPressed) {

      let test = false

      for (let text of test_text_lst) {

        for (let line of test_rect_lst) {
          if ( ( colliders.square_collide(text.pos, text.size, line.pos, line.size) instanceof colliders.Inside ) ) {
            test = true
          }
        }
      
        if (test == false) {
          text.pos.y = text.pos.y + vertical_motion(10, 1, 10, 6.6)
        }
      
      }

      p.fill(0, 102, 153, 51)
    }

    p.fill(0)
    // text.text_draw(p, test_text_lst)
    origin_draw.origin_draw(p, test_text_lst)
    // origin_draw.origin_draw(p, test_line_lst)
    origin_draw.origin_draw(p, test_rect_lst)
  }
}

new p5(sketch);
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <main>
    </main>
  </div>
`

