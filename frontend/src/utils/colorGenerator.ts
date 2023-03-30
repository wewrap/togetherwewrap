export function generateRandomLightColor (): string {
  const r = Math.floor(Math.random() * 100) + 155
  const g = Math.floor(Math.random() * 100) + 155
  const b = Math.floor(Math.random() * 100) + 155

  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}
