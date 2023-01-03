import './style.css'
import {horizontal_movement, vertical_motion} from './1_atoms/math/game'
import * as text from './1_atoms/objects/text'
import * as line from './1_atoms/objects/line'
import * as rect from './1_atoms/objects/rect'
import * as colliders from './1_atoms/collision_detection/collider'
import * as origin_draw from './2_molecules/draws/object_draw'
import p5 from 'p5'

// object declaration
// let test_text_lst = [new text.Text(new p5.Vector(10, 220), new p5.Vector(20, 230) , "hogehoge")]
let own_rect_lst = [new rect.Rect(new p5.Vector(50, 220), new p5.Vector(20, 30))]
let test_rect_lst = [new rect.Rect(new p5.Vector(300, 100), new p5.Vector(30, 300)),]

const none_object = new colliders.None();


const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400)
  }

  p.draw = () => {
    p.background(255);
    if (p.keyIsPressed) {
      p.fill(0)

      let text = own_rect_lst[0]


      if (p.keyCode == p.RIGHT_ARROW) {
        for (let line of test_rect_lst) {
          console.log("line_pos",line.pos)
          console.log("collider",colliders.new_square_collide(text.pos, text.size, line.pos, line.size))
          console.log("none_object", none_object)
          console.log("boolean", colliders.new_square_collide(text.pos, text.size, line.pos, line.size) == none_object)
          if ( colliders.new_square_collide(text.pos, text.size, line.pos, line.size) === none_object) {
            text.pos.x = text.pos.x + horizontal_movement(10, 1)
          }
        }
      } else if (p.keyCode == p.LEFT_ARROW) {
        for (let line of test_rect_lst) {
          if ( colliders.new_square_collide(text.pos, text.size, line.pos, line.size) instanceof colliders.None) {
            text.pos.x = text.pos.x - horizontal_movement(10, 1)
          }
        }
        

      }

    } 

    p.fill(0)
    origin_draw.origin_draw(p, own_rect_lst)
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

