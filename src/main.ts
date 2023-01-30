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
    if (p.keyIsPressed) {
      p.fill(0)

      let text = own_rect_lst[0]


      if (p.keyCode == p.RIGHT_ARROW) {
        // const new_text_size = new p5.Vector(text.size.x + horizontal_movement(10, 1) , text.size.y )
        const new_text_pos = new p5.Vector(text.pos.x + 1 , text.pos.y )
        let new_text = text
        for (let line of test_rect_lst) {
          console.log("right")
          console.log(colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) )
          if ( colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) === "inside") {
            break
          } else {
            text.pos.x = text.pos.x + 1
          }
        }
      } else if (p.keyCode == p.LEFT_ARROW) {
        // const new_text_size = new p5.Vector(text.size.x - horizontal_movement(10, 1) , text.size.y )
        const new_text_pos = new p5.Vector(text.pos.x - 1 , text.pos.y )
        for (let line of test_rect_lst) {
          console.log("left")
          console.log(colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) )
          if ( colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) === "inside") {
            break
          } else {
            text.pos.x = text.pos.x - 1
          }
        }
      } else if(p.keyCode == p.DOWN_ARROW) {
          // const new_text_size = new p5.Vector(text.size.x + 1  , text.size.y )
          const new_text_pos = new p5.Vector(text.pos.x + 1 , text.pos.y )
          for (let line of test_rect_lst) {
            console.log(colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) === "inside" )
            console.log("down")
            console.log("text_pos", new_text_pos)
            console.log("size", text.size)
            if ( colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) === "inside") {
              break
            } else {
              text.pos.y = text.pos.y + 1
            }
          }
          p.fill(0, 102, 153, 51)
      } else if (p.keyCode == p.UP_ARROW) {
        // const new_text_size = new p5.Vector(text.size.x + 1  , text.size.y )
        const new_text_pos = new p5.Vector(text.pos.x - 1 , text.pos.y )
        for (let line of test_rect_lst) {
          console.log(colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) === "inside" )
          console.log("down")
          console.log("text_pos", new_text_pos)
          console.log("size", text.size)
          if ( colliders.new_square_collide(new_text_pos, text.size, line.pos, line.size) === "inside") {
            break
          } else {
            text.pos.y = text.pos.y - 1 
          }
        }
        p.fill(0, 102, 153, 51)
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

