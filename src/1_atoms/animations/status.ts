import { parabola } from './index'

interface AnimationStatus {
  x: number;
  y: number;
  set_x(x: number): void;
  set_y(y: number): void;
  get_x(): number;
  get_y(): number;
  reset(): void;
}

class JumpStruct implements AnimationStatus {
  x: number
  y: number
  constructor(x: number = 1, y: number = 1) {
    this.x = x
    this.y = y
  }

  get_x = () => {
    return this.x
  }

  get_y = () => {
    return this.y
  }

  set_x = (x: number) => {
    this.x = x
  }

  set_y = (y: number) => {
    this.y = y
  }

  reset = () => {
    this.x = 1
    this.y = 1
  }

  // ジャンプ時の次フレームのyの値を返す
  get_dependent_function = (action_name: string="") => {
    if (action_name === "right") {
      return parabola(13, this.x, 45).mul(-1)
    } else if (action_name === "left") {
      return parabola(13, this.x, 45).mul(-1)
    } else {
      return parabola(13, this.x, 45).mul(-1)
    }
  }

  // ジャンプ時の次フレームのyの値を返し、自クラスの状態を変更する
  set_dependent_function = (action_name: string="") => {
    if (action_name === "right") {
      this.set_x(this.x + 1)
      return parabola(13, this.x, 45).mul(-1)
    } else if (action_name === "left") {
      this.set_x(this.x + 1)
      return parabola(13, this.x, 45).mul(-1)
    } else {
      this.set_x(this.x + 1)
      return parabola(13, this.x, 45).mul(-1)
    }
  }

}

export { JumpStruct }


export type { AnimationStatus }