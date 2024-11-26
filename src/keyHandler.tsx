type CreateKeyHandlerParams = {
  cursorIndex: number
  setCursorIndex: (index: number) => void
  valueText: string
}

export function createKeyHandler({ cursorIndex, setCursorIndex, valueText }: CreateKeyHandlerParams) {
  return (event: KeyboardEvent) => {
    console.log({ key:event.key, cursorIndex })
    const handler: Record<string, () => void> = {
      ArrowLeft: () => setCursorIndex(Math.max(cursorIndex - 1, 0)),
      ArrowRight: () => setCursorIndex(Math.min(cursorIndex + 1, valueText.length)),
    }
    handler[event.key]?.()
  }
}
