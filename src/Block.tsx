import { useEffect, useState } from 'react'

import './Block.css'
import { Cursor } from './Cursor'
import { createKeyHandler } from './keyHandler'
import { getClickSide } from './getClickSide'

export function Block() {
  const initialValueText = 'lorem ipsum dolor sit amet'
  const [valueText, setValueText] = useState(initialValueText)
  const [isFocused, setIsFocused] = useState(false)
  const [cursorIndex, setCursorIndex] = useState(0)

  useEffect(() => {
    if (!isFocused) return
    const onKeyDown = createKeyHandler({ cursorIndex, setCursorIndex, setValueText, valueText })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [cursorIndex, isFocused, valueText])

  const createSpanClickHandler = (index: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      event.stopPropagation()
      setIsFocused(true)
      setCursorIndex(index + getClickSide(event))
    }
  }

  const valueNodes = valueText.split('').concat('').map((char, index) => {
    const hasCursor = cursorIndex === index
    const isCursorVisible = isFocused && hasCursor
    let charNode = char
    if (char === ' ') {
      // Prevent whitespaces from collapsing
      charNode = '\u00A0'
    }
    return (
      <span
        key={index}
        onClick={createSpanClickHandler(index)}
      >
        {charNode}
        {isCursorVisible && <Cursor />}
      </span>
    )
  })

  const handleClickDiv = () => {
    setIsFocused(true)
    setCursorIndex(valueText.length)
  }

  const divStyle = {
    border: isFocused ? '1px solid gray' : '1px solid transparent',
    borderRadius: '4px',
    padding: '4px',
  }

  return <div className="block" onClick={handleClickDiv} style={divStyle}>{valueNodes}</div>
}
