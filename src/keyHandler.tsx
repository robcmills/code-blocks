import { clamp } from './clamp'

type CreateKeyHandlerParams = {
  cursorElement: HTMLSpanElement | null
  cursorIndex: number
  setCursorIndex: React.Dispatch<React.SetStateAction<number>>
  setValueText: React.Dispatch<React.SetStateAction<string>>
  valueText: string
}

/**
 * This is a very incomplete implementation obviously
 * https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
 */
export function createKeyHandler({
  cursorElement,
  cursorIndex,
  setCursorIndex,
  setValueText,
  valueText,
}: CreateKeyHandlerParams) {
  const arrowLeftHandler = (event: KeyboardEvent) => {
    if (event.metaKey) {
      // Move cursor to start of line
      const beforeCursor = valueText.slice(0, cursorIndex)
      const lastIndexOfNewline = beforeCursor.lastIndexOf('\n')
      if (lastIndexOfNewline === -1) {
        setCursorIndex(0)
      } else {
        setCursorIndex(lastIndexOfNewline + 1)
      }
      return
    }
    moveCursor(-1)
  }

  const arrowRightHandler = (event: KeyboardEvent) => {
    if (event.metaKey) {
      // Move cursor to end of line
      // Either next newline or end of text
      const afterCursor = valueText.slice(cursorIndex)
      let movement = afterCursor.indexOf('\n')
      if (movement === -1) {
        movement = afterCursor.length
      }
      moveCursor(movement)
      return
    }
    moveCursor(1)
  }

  const arrowDownHandler = () => {
    if (!cursorElement) return
    const cursorRect = cursorElement.getBoundingClientRect()
    const pointBelow = {
      x: cursorRect.left + cursorRect.width / 2,
      y: cursorRect.bottom + cursorRect.height / 2,
    }
    const elementsBelow = document.elementsFromPoint(
      pointBelow.x,
      pointBelow.y,
    )
    const charElement = elementsBelow.find((element) =>
      element.classList.contains('Char'))
    if (!charElement) return
    const index = charElement.getAttribute('data-index')
    if (!index) return
    const charRect = charElement.getBoundingClientRect()
    const charXCenter = charRect.left + charRect.width / 2
    setCursorIndex(parseInt(index) + (charXCenter < pointBelow.x ? 1 : 0))
  }

  const arrowUpHandler = () => {
    if (!cursorElement) return
    const cursorRect = cursorElement.getBoundingClientRect()
    const pointAbove = {
      x: cursorRect.left + cursorRect.width / 2,
      y: cursorRect.top - cursorRect.height / 2,
    }
    const elementsAbove = document.elementsFromPoint(
      pointAbove.x,
      pointAbove.y,
    )
    const charElement = elementsAbove.find((element) =>
      element.classList.contains('Char'))
    if (!charElement) {
      // setCursorIndex(0)
      return
    }
    const index = charElement.getAttribute('data-index')
    if (!index) return
    // Determine whether to move cursor to left or right (index + 1)
    const charRect = charElement.getBoundingClientRect()
    const charXCenter = charRect.left + charRect.width / 2
    setCursorIndex(parseInt(index) + (charXCenter < pointAbove.x ? 1 : 0))
  }

  const moveCursor = (offset: number) => {
    setCursorIndex((currentIndex) =>
      clamp({
        value: currentIndex + offset,
        min: 0,
        max: valueText.length
      })
    )
  }

  const deleteCharAt = (index: number) => {
    if (index < 0) return
    setValueText(valueText.slice(0, index) + valueText.slice(index + 1))
    moveCursor(-1)
  }

  const insertCharAt = (index: number, char: string) => {
    setValueText(valueText.slice(0, index) + char + valueText.slice(index))
    setCursorIndex(index + 1)
  }

  return (event: KeyboardEvent) => {
    event.preventDefault()
    if (event.key.length === 1) {
      insertCharAt(cursorIndex, event.key)
      return
    }
    const handler: Record<string, (event: KeyboardEvent) => void> = {
      ArrowDown: arrowDownHandler,
      ArrowLeft: arrowLeftHandler,
      ArrowRight: arrowRightHandler,
      ArrowUp: arrowUpHandler,
      Backspace: () => deleteCharAt(cursorIndex - 1),
      Enter: () => insertCharAt(cursorIndex, '\n')
    }
    handler[event.key]?.(event)
  }
}
