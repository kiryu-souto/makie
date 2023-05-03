import p5 from 'p5'
import {Store, Rect} from 'gedux'

/**
 * @jest-environment node
 */

describe('当たり判定', () => {
    it('データ格納', function () {
        const store_value = new Store()
        const rect = new Rect(new p5.Vector(0, 0), new p5.Vector(0, 0))
        store_value.set_item("item", rect)
        store_value.set_item("item", rect)
        expect(store_value.strage["item"][1].id).toBe(rect.id)
    })

    it('データ取り出し', () => {
        const store_value = new Store()
        const rect = new Rect(new p5.Vector(0, 0), new p5.Vector(0, 0))
        store_value.set_item("item", rect)
        expect(store_value.get_type_array("item")[0]).toBe(rect)
    })
});

