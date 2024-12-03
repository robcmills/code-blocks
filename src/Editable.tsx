import { useRef, useState } from 'react'
import { appendCode } from './appendCode'
import './Editable.css'
import { insertNewlineAtCursor } from './insertNewlineAtCursor'

export function Editable() {
  const editableRef = useRef<HTMLDivElement>(null)
  const [value] = useState('')
  console.log({ value })

  const onInput = (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target
    // console.log({ target })
    if (!(target instanceof HTMLElement)) {
      return
    }
    if (target.textContent?.startsWith('```')) {
      target.textContent = ''
      appendCode(target)
      return
    }
    for (const child of target.children) {
      if (child.textContent?.startsWith('```')) {
        child.textContent = ''
        appendCode(child)
      }
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log('Editable', { event, key: event.key })
    const selection = window.getSelection();
    console.log({ selection })
    const selectionNode = selection?.focusNode;
    console.log({ selectionNode })
    if (!selectionNode) return
    const selectionElement = selectionNode.parentElement
    console.log({ selectionElement })
    // const codeNode = editableElement.parentNode?.nodeName === 'CODE'
    //   ? editableElement.parentNode
    //   : null
    if (event.key === 'Enter' && selectionElement?.nodeName === 'CODE') {
      console.log('Enter in code node')
      event.preventDefault()
      insertNewlineAtCursor(selectionElement)
    }
  }

  return (
    <div
      className="Editable"
      contentEditable
      onInput={onInput}
      onKeyDown={onKeyDown}
      ref={editableRef}
      tabIndex={0}
    />
  )
}
