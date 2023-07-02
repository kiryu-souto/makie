import { GameObject } from "@internal/1_atoms/game_objects"
import { Rect } from "@internal/1_atoms/objects/rect";

type PersonProxy = GameObject & ProxyHandler<GameObject>;

// y軸座標の補正処理
function collider_fix_y_position(attach_item: Rect, collide_object: PersonProxy) {
    // 補正文のy座標の数値
    const up_y = collide_object.y_length() + attach_item.y_length() - (attach_item.max_y - collide_object.min_y)

    if (up_y > 0) {
        collide_object.set_y(-1 * (up_y + 1))
    }
}

// ゲームの当たり判定の確定をする関数
// 副作用として、当たったあとの処理の状態更新を行う
function collider_confirm(attach_status: 
    { collided_object: Rect, collide_object: Rect, collider_action: string }[],game_object: PersonProxy)
    {
    const attach_status_item = attach_status.find(value => value["collided_object"].id === game_object.id)

    if (attach_status_item != undefined){
        collider_fix_y_position(attach_status_item.collide_object, game_object)
    }
}

// キー入力によって確定する
function key_input(key: string,game_object: PersonProxy) {
    if (key !== "") {
        game_object.action(key)
      } else {
        game_object.action("down")
      }
}

// ゲームオブジェクトを消す処理
function delete_game_object(delete_game_object:GameObject ,now_game_obj_lst: GameObject[], game_obj_lst: GameObject[], proxy_lst: any) {
    now_game_obj_lst = now_game_obj_lst.filter((item) => { item.id !== delete_game_object.id })
    game_obj_lst = game_obj_lst.filter((item) => { item.id !== delete_game_object.id })
    proxy_lst.set("enemy", proxy_lst.get("enemy")?.filter((item: any) => { item.id !== delete_game_object.id }) ?? [])
}


export {collider_confirm, key_input, delete_game_object, collider_fix_y_position}