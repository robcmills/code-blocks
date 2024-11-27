import { appendCode } from './appendCode'
import './Editable.css'

import { useState } from 'react'

export function Editable() {
  const [value] = useState('')
  console.log({ value })

  const onInput = (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target
    console.log({ target })
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

  return <div className="Editable" contentEditable onInput={onInput} />
}
