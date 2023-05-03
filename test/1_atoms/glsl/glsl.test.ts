import { GPU } from 'gpu.js';

const glsl_code = `
void main() {
    gl_FragColor = vec4(0.0, 0.58, 0.86, 1.0);
}
`
const gpu = new GPU();
const multiplyMatrix = gpu.createKernel(function(a: number[][], b: number[][]) {
  let sum = 0;
  for (let i = 0; i < 512; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
  }
  return sum;
}).setOutput([512, 512]);



test('配列計算', function () {
  const c = multiplyMatrix([[1, 2, 3]], [[3, 2, 1]]) as number[][];
  console.log(c)
  console.log(glsl_code)
  expect(1).toBe(1)
})