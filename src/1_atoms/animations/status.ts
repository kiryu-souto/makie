import { Decimal } from 'decimal.js'

import { parabola } from './index'

interface AnimationStatus {
  set_x(x: number): void;
  set_y(y: number): void;
  get_x(): number;
  get_y(): number;
  reset(): void;
  confirm_dependent_function (action_name: string): {x: Decimal, y: Decimal};
  handler(type_name: string): Status;
}

class Status implements AnimationStatus {
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

  confirm_dependent_function(action_name: string = ""): { x: Decimal; y: Decimal; } {
    if (action_name === "") {
      return {x: new Decimal(0), y: new Decimal(0)}
    } else {
      return {x: new Decimal(0), y: new Decimal(0)}
    }
  }

  reset = () => {
    this.x = 1
    this.y = 1
  }

  // ステートを変えるファンクション
  handler = (type_name: string="") => {
    return new Status()
  }
}

class JumpStruct extends Status {
  constructor(x: number = 1, y: number = 1) {
    super(x, y)
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
  expect_dependent_function = (action_name: string="") => {
    if (action_name === "right") {
      return {x: new Decimal(1), y: parabola(13, this.x, 45).mul(-1)}
    } else if (action_name === "left") {
      return {x: new Decimal(-1), y: parabola(13, this.x, 45).mul(-1)}
    } else {
      return {x: new Decimal(0), y: parabola(13, this.x, 45).mul(-1)}
    }
  }

  // ジャンプ時の次フレームのyの値を返し、自クラスの状態を変更する
  confirm_dependent_function = (action_name: string="") => {
    if (action_name === "right") {
      this.set_x(this.x + 1)
      return { x: new Decimal(1), y: parabola(13, this.x, 45).mul(-1)}
    } else if (action_name === "left") {
      this.set_x(this.x + 1)
      return {x: new Decimal(-1), y: parabola(13, this.x, 45).mul(-1)}
    } else {
      this.set_x(this.x + 1)
      return {x: new Decimal(0), y: parabola(13, this.x, 45).mul(-1)}
    }
  }

  handler = (type_name: string = ""): Status => {
    switch (type_name) {
      case "jump":
        return new JumpStruct()
      case "landing":
        return new LandingStruct()
        
      default:
        return this
    }
  }

}

// x, yには上下のベルトル量を保存
class LandingStruct extends Status {
  constructor(x: number = 1, y: number = 1) {
    super(x, y)
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

  expect_dependent_function = (action_name: string="") => {
    if (action_name === "right") {
      return {x: new Decimal(1), y: new Decimal(0)}
    } else if (action_name === "left") {
      return {x: new Decimal(-1), y: new Decimal(0)}
    } else if(action_name === "up") {
      return {x: new Decimal(0), y: new Decimal(-1)}
    } else {
      return {x: new Decimal(0), y: new Decimal(1)}
    }
  }

  confirm_dependent_function = (action_name: string="") => {
    if (action_name === "right") {
      return {x: new Decimal(1), y: new Decimal(0)}
    } else if (action_name === "left") {
      return {x: new Decimal(-1), y: new Decimal(0)}
    } else if(action_name === "up") {
      return {x: new Decimal(0), y: new Decimal(-1)}
    } else {
      return {x: new Decimal(0), y: new Decimal(1)}
    }
  }

  handler = (type_name: string = ""): Status => {
    switch (type_name) {
      case "jump":
        return new JumpStruct()

      case "landing":
        return new LandingStruct()
    
      default:
        return new JumpStruct
    }
  }
}

export { JumpStruct, LandingStruct, Status }


export type { AnimationStatus }