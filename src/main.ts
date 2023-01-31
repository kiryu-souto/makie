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
let test_rect_lst = [ new rect.Rect(new p5.Vector(300, 100), new p5.Vector(30, 300)), 
                      new rect.Rect(new p5.Vector(0, 350), new p5.Vector(300, 30)),
                     new rect.Rect(new p5.Vector(0, 100), new p5.Vector(30, 300)),
                     new rect.Rect(new p5.Vector(0, 70), new p5.Vector(300, 30))]


const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400)
  }

  p.draw = () => {
    p.background(255);
    let text = own_rect_lst[0]
    let new_text = new rect.Rect(text.pos, text.size)
    let attach_status = []

    if (p.keyIsPressed) {
      p.fill(0)

      if (p.keyCode == p.RIGHT_ARROW) {
        new_text.set_x(1)
      } else if (p.keyCode == p.LEFT_ARROW) {
        new_text.set_x(-1)
      } else if(p.keyCode == p.DOWN_ARROW) {
        new_text.set_y(1)
      } else if (p.keyCode == p.UP_ARROW) {
        new_text.set_y(-1)
      }
    }

    // 当たり判定判別
    for (let line of test_rect_lst) {
      // console.log("old_collide")
      // console.log(colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) )
      // console.log("test")
      // console.log(new_text)
      // console.log("test_line")
      // console.log(line)
      console.log("text")
      console.log(text)
      console.log("tet_collider")
      console.log(colliders.new_square_collide_2(new_text, line))
      if ( colliders.new_square_collide_2(new_text, line) === "inside") {
        attach_status.push('inside')
      } else {
        attach_status.push('none')
      }
    }

    if (!attach_status.some(value => value == 'inside')) {
      own_rect_lst[0] = new_text
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

