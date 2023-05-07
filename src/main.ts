import './style.css'
import { horizontal_movement, vertical_motion } from './1_atoms/math/game'
import * as text from './1_atoms/objects/text'
import * as line from './1_atoms/objects/line'
import { Rect } from './1_atoms/objects/rect'
import { Ally } from './1_atoms/game_objects/ally'
import { GameObject } from './1_atoms/game_objects/game_object'
import { Enemy } from './1_atoms/game_objects/enemy'
import * as colliders from './1_atoms/collision_detection/collider'
import * as origin_draw from './2_molecules/draws/object_draw'
import p5 from 'p5'

// object declaration
// let test_text_lst = [new text.Text(new p5.Vector(10, 220), new p5.Vector(20, 230) , "hogehoge")]
let own_rect_lst = [new Ally(new p5.Vector(50, 220), new p5.Vector(20, 30))]
let enemy_rect_lst = [new Enemy(new p5.Vector(100, 220), new p5.Vector(20, 30))]
let object_rect_lst = [new GameObject(new p5.Vector(300, 100), new p5.Vector(30, 300), [200, 200, 200, 200]),
new GameObject(new p5.Vector(0, 350), new p5.Vector(300, 30), [200, 200, 200, 200]),
new GameObject(new p5.Vector(0, 100), new p5.Vector(30, 300), [200, 200, 200, 200]),
new GameObject(new p5.Vector(0, 70), new p5.Vector(300, 30), [200, 200, 200, 200])]

// snake_case変換関数
function change_snake_change(str: string): string {
  const camelcase = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  return camelcase.split(/(?=[A-Z])/).join('_').toLowerCase()
}

// proxyオブジェクトの生成
function proxy_builder(...params: GameObject[][]): Map<any, GameObject[]> {
  let ans = new Map();
  for (let item_lst of params) {
    item_lst.forEach((value, index) => {
      const key_name = change_snake_change(value.constructor.name)
      if (index === 0) {
        ans.set(key_name, [new Proxy(value, {})])
      } else {
        const before_lst = ans.get(key_name)
        before_lst.push(new Proxy(value, {}))
        ans.set(key_name, before_lst)
      }
    })
  }
  return ans;
}

// アニメーション関数
// オブジェクトのfunction_stateの状態に応じた振る舞いを強要する
// この関数はatomsフォルダに格納する
// function animation_func(game_object: GameObject) {
//   const game_object_state = game_object.animation_state

// }

let proxy_lst = proxy_builder(own_rect_lst, enemy_rect_lst, object_rect_lst)


const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400)
  }

  p.draw = () => {
    p.background(255);
    let text = proxy_lst.get("ally") ?? []
    let new_text = new Ally(text[0].pos, text[0].size)
    let attach_status: Array<{ [key: string]: Rect; }> = []
    let input_key = ""

    // キー入力: start

    // キープレスをしたときに発火する
    if (p.keyIsPressed) {
      p.fill(0)

      // キーが入力された場合の分岐
      // ここはアーキテクチャを変更して、抽象化することが可能だ。
      if (p.keyCode == p.RIGHT_ARROW) {
        input_key = "right"
      } else if (p.keyCode == p.LEFT_ARROW) {
        input_key = "left"
      } else if (p.keyCode == p.DOWN_ARROW) {
        input_key = "down"
      } else if (p.keyCode == p.UP_ARROW) {
        input_key = "up"
      }
    }

    // キー入力: end

    // 入力後のゲームのステートを生成: start
    // 未来の自分の状態を生成
    if (input_key === "right") {
      new_text.action("right")
    } else if (input_key === "left") {
      new_text.action("left")
    } else if (input_key === "down") {
      new_text.action("down")
    } else if (input_key === "up") {
      new_text.action("up")
    } else {
      new_text.action("down")
    }
    // 入力後のゲームのステートを生成: end

    // 当たり判定部分: start

    // 自機当たり判定判別
    for (let line of object_rect_lst) {
      if (colliders.new_square_collide_2(new_text, line) === "inside") {
        attach_status.push({ "collided_object": text[0], "collide_object": line })
      }
    }

    // 敵機の当たり判定
    for (let item of enemy_rect_lst) {
      if (colliders.new_square_collide_2(new_text, item) === "inside") {
        attach_status.push({ "collided_object": text[0], "collide_object": item })
      }
    }
    // 当たり判定部分: end

    // ゲームオブジェクトのステート決定: start
    // 当たり判定がない場合の処理
    if (attach_status.some(value => value["collided_object"].id === text[0].id)) {
      text[0].action("collided")
      text[0].start_codinate.reset()
      const test = attach_status.find(value => value["collided_object"].id === text[0].id) ?? {}

      if (text[0].y_length() + test.collide_object.y_length() - (test.collide_object.max_y - text[0].min_y) > 0) {
        text[0].set_y(-((text[0].y_length() + test.collide_object.y_length() - (test.collide_object.max_y - text[0].min_y)) + 1))
      }
    } else {
      // setterが発火する
      if (input_key !== "") {
        text[0].action(input_key)
      } else {
        text[0].action("down")
      }
    }

    // 敵機の当たり判定の反映
    enemy_rect_lst.forEach((value, index) => {
      for (let attach_item of attach_status) {
        if (attach_item["collide_object"].id === value.id) {
          value.action("collided")
          enemy_rect_lst[index] = value
        }
      }
    })
    // ゲームオブジェクトのステート決定: end

    // 描画: start
    origin_draw.origin_draw(p, own_rect_lst)
    origin_draw.origin_draw(p, enemy_rect_lst)
    origin_draw.origin_draw(p, object_rect_lst)
    // 描画: end
  }
}

new p5(sketch);
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <main>
    </main>
  </div>
`