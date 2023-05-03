// 微分係数を計算
// 微分係数を計算後、
import {Decimal} from 'decimal.js'

function easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);  
}

function bunkatu(a:Decimal, b:Decimal, bunkatu: number): Decimal {
    let test = b.sub(a)
    let bunkatu1 = test.div(bunkatu)
    let ans = a
    for (let i = 0; i <= bunkatu; i++) {
        ans = ans.add(bunkatu1)
    }
    return ans
}

function sekibun(kansu: (x: number) => number, kugiri: number): Decimal {
    let ans = new Decimal(0)
    let bunkatu = new Decimal(1 / kugiri)
    for (let i = 0; i <= kugiri-1; i++) {
        let kubun = [bunkatu, bunkatu.add(1 / kugiri)]
        ans = ans.add(kansu(1 / kugiri)).mul(kubun[1].sub(kubun[0]))
        bunkatu = bunkatu.add( 1 / kugiri)
    }
    return ans
}

// 式:      tan(cita)x - g x^2 / 2(v0 * cos (cita)) ^ 2
// v0:      初速
// x:       xの初期座標
// cita:    角度
// grabity: 万有引力定数
function parabola(v0: number,x: number, cita: number, grabity: Decimal): Decimal {
    return Decimal.tan(cita).mul(x)
                  .sub(
                        grabity.mul(x**2)
                        .div(
                            Decimal.cos(cita).mul(v0).pow(2).mul(2)
                        ))
}

export {easeInSine, sekibun, bunkatu, parabola}