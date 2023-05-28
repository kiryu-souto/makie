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
}

export { JumpStruct }


export type { AnimationStatus }