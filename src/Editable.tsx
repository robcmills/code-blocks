import { useState } from 'react'
import { appendCode } from './appendCode'
import './Editable.css'

export function Editable() {
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
    const editableElement = selection?.focusNode;
    console.log({ editableElement })
    if (!editableElement) return
    // if the editable element is a code element, prevent the default behavior
    // (which is to append a new code element)
    // and manaually emulate (best attempt) the behavior 
    // when parent code element has editableContent attribute
    // (which is to append new child text nodes)
    const codeNode = editableElement.parentNode?.nodeName === 'CODE'
      ? editableElement.parentNode
      : null
    if (event.key === 'Enter' && codeNode) {
      console.log('Enter in code node')
      event.preventDefault()

      codeNode.appendChild(document.createTextNode('\n'))
      const newTextNode = document.createTextNode('')
      codeNode.appendChild(newTextNode)
      // Create a new range
      const range = document.createRange();
      // Position the range at the end of the new text node
      range.setStart(newTextNode, 0);
      range.setEnd(newTextNode, 0);
      // Get the selection object and update it
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <div
      className="Editable"
      contentEditable
      onInput={onInput}
      onKeyDown={onKeyDown}
      tabIndex={0}
    />
  )
}
