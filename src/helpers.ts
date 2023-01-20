export function nanoid(): string {
  return Math.random().toString(36).slice(2)
}
