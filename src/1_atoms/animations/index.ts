// 微分係数を計算
// 微分係数を計算後、
import { Decimal } from 'decimal.js'
import { AnimationStatus, JumpStruct, LandingStruct, Status } from './status'

function easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
}

function bunkatu(a: Decimal, b: Decimal, bunkatu: number): Decimal {
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
    for (let i = 0; i <= kugiri - 1; i++) {
        let kubun = [bunkatu, bunkatu.add(1 / kugiri)]
        ans = ans.add(kansu(1 / kugiri)).mul(kubun[1].sub(kubun[0]))
        bunkatu = bunkatu.add(1 / kugiri)
    }
    return ans
}

// 式:      tan(cita)x - g x^2 / 2(v0 * cos (cita)) ^ 2
// v0:      初速
// x:       xの初期座標
// cita:    角度
// grabity: 万有引力定数
function parabola(v0: number, x: number, cita: number, grabity: Decimal = new Decimal(6.708)): Decimal {

    return Decimal.tan(cita).mul(x)
        .sub(
            grabity.mul(x ** 2)
                .div(
                    Decimal.cos(cita).mul(v0).pow(2).mul(2)
                ))

}

// ###

// 動摩擦係数
// 式: f"k" = u"k" * N
function coefficient_of_kinetic_frinction(now_x: number, masatu: number, nurton: number): number {
    return now_x - (masatu * nurton)
}


export { JumpStruct, Status, LandingStruct, easeInSine, sekibun, 
    bunkatu, parabola, coefficient_of_kinetic_frinction }
export type { AnimationStatus }