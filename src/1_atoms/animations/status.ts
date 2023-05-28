interface AnimationStatus {
  x: number;
  y: number;
  set_x(x: number): void;
  set_y(y: number): void;
  get_x(): number;
  get_y(): number;
  reset(): void;
}

export type { AnimationStatus }