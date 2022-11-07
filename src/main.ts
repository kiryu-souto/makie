import './style.css'
import {horizontal_movement, vertical_motion} from './1_atoms/math/game'
// import {Substance} from './3_organisms/charactor/charactor'
import * as text from './1_atoms/objects/text'
import * as origin_draw from './2_molecules/draws/object_draw'
import p5 from 'p5'

let x: number = 50
let test_text_lst = [new text.Text(10, 220, "hogehoge")]

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400)
  }

  p.draw = () => {
    p.background(255);
    if (p.mouseIsPressed) {
      p.fill(0)
      x = x + horizontal_movement(10, 1)
      for (let text of test_text_lst) {
        text.x = text.x + horizontal_movement(10, 1)
      }
    } else {
      for (let text of test_text_lst) {
        text.y = text.y + vertical_motion(10, 1, 90, 6.6)
      }
      p.fill(0, 102, 153, 51)
    }

    p.fill(0)
    x = x + horizontal_movement(10, 1)
    // text.text_draw(p, test_text_lst)
    origin_draw.origin_draw(p, test_text_lst)
  }
  // p.mousePressed = () => {
  //   p.fill(0)
  //   for (let text of test_text_lst) {
  //     text.x = text.x + horizontal_movement(10, 1)
  //   }
  //   x = x + horizontal_movement(10, 1)
  // } 

  // p.mouseReleased = () => {
  //   p.fill(0, 102, 153, 51)
  //   p.loop()
  // }
}

new p5(sketch);
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <main>
    </main>
  </div>
`

