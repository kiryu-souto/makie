import * as math from 'mathjs'
import {XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser'
import * as game_object_imp from './1_atoms/game_objects'

const xml_str = `
<objects>
<game_object>
  <pos>
    <x>30</x>
    <y>100</y>
  </pos>
  <size>
    <x>30</x>
    <y>300</y>
  </size>
  <color>
    [200, 200, 200, 200]
  </color>
</game_object>
<ally>
  <pos>
    <x>30</x>
    <y>100</y>
  </pos>
  <size>
    <x>30</x>
    <y>300</y>
  </size>
  <color>
    [200, 200, 200, 200]
  </color>
</ally>
<ally>
  <pos>
    <x>30</x>
    <y>100</y>
  </pos>
  <size>
    <x>30</x>
    <y>300</y>
  </size>
  <color>
    [200, 200, 200, 200]
  </color>
</ally>
</objects>
`

// スネークケースをキャメルケースに変更
function toCamelCase(snakeCase: string): string {
  return snakeCase.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase()
          .replace('-', '')
          .replace('_', '')
  );
}

// キャメルケースをクラス名んじ変更
function toObjectCase(snakeCase: string): string {
  const camelCase = toCamelCase(snakeCase)
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}

// func_start

// xml処理部分 start
const parser = new XMLParser()
// ここでxmlのobjectが格納されている
// xmlのタグが同じ階層にある場合配列として格納される
let jsonObj = parser.parse(xml_str)

// 読み込み済みのクラスのマップ
let origin_game_objects: Map<string, Array<any>> = new Map();

// xmlの中身を反復する
Object.keys(jsonObj["objects"]).forEach(function(key: any) {

  // 型を配列として取得する
  const object_name = toObjectCase(key)

  // gameオブジェクトの一覧を取得
  const get_object_class = game_object_imp[object_name]
  const lst = origin_game_objects.get(key)

  // origin_game_objects.get()でkeyと同じ名前のクラスがある場合
  if (lst !== undefined) {

    // jsonObjectのキーが配列の場合
    if (Array.isArray(jsonObj["objects"][key]) ) {
      const ans: Array<any> = []

      // 配列のオブジェクトをインスタンスを作成
      jsonObj["objects"][key].forEach(function(item: Object) {
        let item_2 = get_object_class !== undefined ? new get_object_class(new p5.Vector(0, 0), new p5.Vector(0, 0)) : ""
        ans.push(new Proxy(item_2, {}))
      })
      origin_game_objects.set(key, ans)
    } else {
      // 単体のオブジェクトをインスタンスを作成
      const item = get_object_class !== undefined ? new get_object_class(new p5.Vector(0, 0), new p5.Vector(0, 0)) : ""
      origin_game_objects.set(key, [new Proxy(item, {})])
    }
  // origin_game_objects.get()でkeyと同じ名前のクラスがない場合
  } else {
    if (Array.isArray(jsonObj["objects"][key]) ) {
      const ans: Array<any> = []

      // 配列のオブジェクトをインスタンスを作成
      jsonObj["objects"][key].forEach(function(item: Object) {
        let item_2 = get_object_class !== undefined ? new get_object_class(new p5.Vector(0, 0), new p5.Vector(0, 0)) : ""
        ans.push(new Proxy(item_2, {}))
      })
      origin_game_objects.set(key, ans)
    } else {

      // 単体のオブジェクトをインスタンスを作成
      const item = get_object_class !== undefined ? new get_object_class(new p5.Vector(0, 0), new p5.Vector(0, 0)) : ""
      origin_game_objects.set(key, [new Proxy(item, {})])
    }
  }
})

// xml処理部分 end

console.log("test4")
console.log(origin_game_objects)

// func_end

// プロパティ一覧を取得
function getAllPropertyNames(object: any): Set<string> {
  let properties: Set<string> = new Set();

  for(let obj = object; obj !== null && typeof obj.__proto__ !== null; obj = Object.getPrototypeOf(obj)) {
    let names = Object.keys(obj)
    names.forEach((k) => properties.add(k));
  }
  return properties;
}
