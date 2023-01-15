export function sum(...num: number[]): number {
  return num.reduce((acc, value) => (acc += value), 0)
}
