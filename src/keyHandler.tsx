import { clamp } from './clamp'

type CreateKeyHandlerParams = {
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
  cursorIndex,
  setCursorIndex,
  setValueText,
  valueText,
}: CreateKeyHandlerParams) {
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
    setValueText(valueText.slice(0, index) + valueText.slice(index + 1))
    moveCursor(-1)
  }

  const insertCharAt = (index: number, char: string) => {
    setValueText(valueText.slice(0, index) + char + valueText.slice(index))
    setCursorIndex(index + 1)
  }

  return (event: KeyboardEvent) => {
    console.log({ key: event.key })
    if (event.key.length === 1) {
      insertCharAt(cursorIndex, event.key)
      return
    }
    const handler: Record<string, () => void> = {
      ArrowLeft: () => moveCursor(-1),
      ArrowRight: () => moveCursor(1),
      Backspace: () => deleteCharAt(cursorIndex - 1),
      Enter: () => insertCharAt(cursorIndex, '\n')
    }
    handler[event.key]?.()
  }
}
