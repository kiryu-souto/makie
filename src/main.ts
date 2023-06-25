import './style.css'
import { Rect } from './1_atoms/objects/rect'
import { Ally } from './1_atoms/game_objects/ally'
import { GameObject } from './1_atoms/game_objects/game_object'
import { Enemy } from './1_atoms/game_objects/enemy'
import * as colliders from './1_atoms/collision_detection/collider'
import * as origin_draw from './2_molecules/draws/object_draw'
import { collider_confirm, key_input, delete_game_object, collider_fix_y_position } from './2_molecules/collider_confirm/collider_confirm'
import p5 from 'p5'

// object declaration
// let attach_object_text_lst = [new text.Text(new p5.Vector(10, 220), new p5.Vector(20, 230) , "hogehoge")]
let own_rect_lst = [new Ally(new p5.Vector(50, 220), new p5.Vector(20, 30))]
let enemy_rect_lst = [new Enemy(new p5.Vector(100, 230), new p5.Vector(20, 30))]
let object_rect_lst = [
  new GameObject(new p5.Vector(360, 100), new p5.Vector(30, 300), [200, 200, 200, 200]),
  new GameObject(new p5.Vector(0, 370), new p5.Vector(400, 30), [200, 200, 200, 200]),
  new GameObject(new p5.Vector(0, 100), new p5.Vector(30, 300),  [200, 200, 200, 200]),
  new GameObject(new p5.Vector(0, 100), new p5.Vector(400, 30),  [200, 200, 200, 200]),
  new GameObject(new p5.Vector(150, 250), new p5.Vector(30, 30),  [200, 200, 200, 200]),
  new GameObject(new p5.Vector(180, 250), new p5.Vector(30, 30),  [200, 200, 200, 200]),
  new GameObject(new p5.Vector(210, 250), new p5.Vector(30, 30),  [200, 200, 200, 200]),
  new GameObject(new p5.Vector(180, 150), new p5.Vector(30, 30),  [200, 200, 200, 200])
]

const delete_propety_handler = {
  deleteProperty(target: any, prop: any): any {
    // enemy_rect_lst = enemy_rect_lst.filter((item) => { item.id !== enemy_item.id })
    const enemy_find = enemy_rect_lst.findIndex((item) => { item.id !== prop })
    if (enemy_find > -1){
      delete target[enemy_find]
    }
  }
}

enemy_rect_lst = new Proxy(enemy_rect_lst, delete_propety_handler)

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
    let enemys = proxy_lst.get("enemy") ?? []
    let new_text = new Ally(text[0].pos, text[0].size)
    let attach_status: Array<{ [key: string]: Rect; }> = []
    let input_key = ""
    let new_enemys: Array<Enemy> = []

    if (enemys.length > 0) {
      for (let item of enemys) {
        new_enemys.push(new Enemy(item.pos, item.size, item.color))
      }
    }

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
    if (input_key != "") {

      new_text.action(input_key)

    } else {

      new_text.action("down")

    }

    // 敵機の未来の状態を生成
    for (let item of new_enemys) {
      item.action("down")
    }

    // 入力後のゲームのステートを生成: end

    // 当たり判定部分: start

    // 自機当たり判定判別
    for (let line of object_rect_lst) {
      if (colliders.new_square_collide_2(new_text, line) === "inside") {
        attach_status.push({ "collided_object": text[0], "collide_object": line })
      }
    }

    // 自機と敵機の当たり判定
    for (let item of enemy_rect_lst) {
      if (colliders.new_square_collide_2(new_text, item) === "inside") {
        attach_status.push({ "collided_object": text[0], "collide_object": item })
      }
    }

    // 敵機とオブジェクトの当たり判定
    for (let line of object_rect_lst) {
      new_enemys.forEach((enemy_item, index) => {
        if (colliders.new_square_collide_2(enemy_item, line) === "inside") {
          attach_status.push({ "collided_object": enemys[index], "collide_object": line })
        }
      })
    }
    // 当たり判定部分: end

    // ゲームオブジェクトのステート決定: start
    // 自機の当たり判定がある場合の処理
    if (attach_status.some(value => value["collided_object"].id === text[0].id)) {

      text[0].action("collided")
      text[0].condition.reset()

      collider_confirm(attach_status, text[0])

    } else {

      // setterが発火する

      key_input(input_key, text[0])

    }

    // 敵機の当たり判定の反映
    enemy_rect_lst.forEach((enemy_item, index) => {
      if (attach_status.some(value => value["collide_object"].id === enemy_item.id)) {

        for (let attach_item of attach_status) {

          if (attach_item["collide_object"].id === enemy_item.id) {

            if (attach_item["collided_object"] instanceof Ally) {

              // 敵機を消す処理
              enemys = enemys.filter((item) => { item.id !== enemy_item.id })
              enemy_rect_lst = enemy_rect_lst.filter((item) => { item.id !== enemy_item.id })
              proxy_lst.set("enemy", proxy_lst.get("enemy")?.filter((item) => { item.id !== enemy_item.id }) ?? [])

            }

          }

        }

      } else if (attach_status.some(value => value["collided_object"].id === enemy_item.id)) {

        const attach_status_item = attach_status.find(value => value["collided_object"].id === enemy_item.id) ?? {}
        enemy_item.action("collided")
        enemy_item.condition.reset()

        collider_fix_y_position(attach_status_item.collide_object, enemy_item)

      } else {
        key_input("down", enemy_item)
      }
    })
    // ゲームオブジェクトのステート決定: end

    // 描画: start
    origin_draw.origin_draw(p, own_rect_lst)
    origin_draw.origin_draw(p, enemys)
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