type ClampParams = {
  value: number
  min: number
  max: number
}

export function clamp({ value, min, max }: ClampParams): number {
    return Math.min(Math.max(value, min), max);
}