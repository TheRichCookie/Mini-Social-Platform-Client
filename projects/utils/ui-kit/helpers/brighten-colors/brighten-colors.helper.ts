export function ukBrightenColor(rgba: string, factor: number): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

  if (!match) return rgba;
  const [r, g, b] = match.slice(1, 4).map(Number);
  const brighten = (v: number): number => Math.min(255, v * factor);

  return `rgba(${brighten(r)}, ${brighten(g)}, ${brighten(b)}, 1)`;
}
