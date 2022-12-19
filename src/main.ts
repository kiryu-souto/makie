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
let own_rect_lst = [new rect.Rect(new p5.Vector(0, 220), new p5.Vector(20, 30))]
// let test_line_lst = [new line.Line(new p5.Vector(10, 230), new p5.Vector(50, 230))]
// let test_line_lst = [new line.Line(new p5.Vector(100, 100), new p5.Vector(200, 300)),
//                     new line.Line(new p5.Vector(0, 300), new p5.Vector(300, 300))]
let test_rect_lst = [new rect.Rect(new p5.Vector(300, 100), new p5.Vector(30, 300)),
                     new rect.Rect(new p5.Vector(0, 350), new p5.Vector(300, 30))]


const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400)
  }

  p.draw = () => {
    p.background(255);
    if (p.keyIsPressed) {
      p.fill(0)

      for (let text of own_rect_lst) {
        
        if (p.keyCode == p.RIGHT_ARROW) {
          for (let line of test_rect_lst) {
            const new_own_size = new p5.Vector(text.size.x + horizontal_movement(10, 1), text.pos.y)
            if ( !(colliders.new_square_collide(text.pos, new_own_size, line.pos, line.size) instanceof colliders.Inside) ) {
              text.pos.x = text.pos.x + horizontal_movement(10, 1)
            }
            console.log("test1", colliders.new_square_collide(text.pos, new_own_size, line.pos, line.size).constructor ), 
            console.log("test2", !(colliders.new_square_collide(text.pos, new_own_size, line.pos, line.size) instanceof colliders.Inside))
          }
        } else if (p.keyCode == p.LEFT_ARROW) {
          for (let line of test_rect_lst) {
            const new_own_size = new p5.Vector(text.size.x - horizontal_movement(10, 1), text.pos.y)
            if ( !(colliders.new_square_collide(text.pos, new_own_size, line.pos, line.size) instanceof colliders.Inside) ) {
              text.pos.x = text.pos.x - horizontal_movement(10, 1)
            }
            console.log("test3", colliders.new_square_collide(text.pos, new_own_size, line.pos, line.size).constructor)
            console.log("test4", !(colliders.new_square_collide(text.pos, new_own_size, line.pos, line.size) instanceof colliders.Inside))
          }
        }

      }

    } else if(p.mouseIsPressed) {

      for (let text of own_rect_lst) {
        for (let line of test_rect_lst) {
          const new_own_pos = new p5.Vector(text.pos.x - vertical_motion(1, 1, 10, 6.6), text.pos.y)
          if ( !(colliders.new_square_collide(new_own_pos, text.size, line.pos, line.size) instanceof colliders.Top)) {
            text.pos.y = text.pos.y + vertical_motion(1, 1, 10, 6.6)
          } 
          console.log(colliders.new_square_collide(new_own_pos, text.size, line.pos, line.size).constructor)
        }      
      }

      p.fill(0, 102, 153, 51)
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

