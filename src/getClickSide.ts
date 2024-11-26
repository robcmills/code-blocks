export function getClickSide(event: React.MouseEvent<HTMLSpanElement>): 0 | 1 {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const elementWidth = rect.width

  return clickX < elementWidth / 2 ? 0 : 1
}