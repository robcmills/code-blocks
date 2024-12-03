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
  console.log({
    cursorIndex,
    value: valueText.slice(0, cursorIndex) + '|' + valueText.slice(cursorIndex)
  })

  useEffect(() => {
    if (!isFocused) return
    const onKeyDown = createKeyHandler({
      cursorIndex,
      setCursorIndex,
      setValueText,
      valueText
    })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [cursorIndex, isFocused, valueText])

  const createCharClickHandler = (index: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      event.stopPropagation()
      setIsFocused(true)
      setCursorIndex(index + getClickSide(event))
    }
  }

  let cursorNodeIndex = -1
  const lines = valueText.split('\n').map((line, lineIndex) => {
    const chars = line.split('').concat('').map((char) => {
      cursorNodeIndex++
      const hasCursor = cursorNodeIndex === cursorIndex
      const isCursorVisible = isFocused && hasCursor
      let charNode = char
      if (char === ' ') {
        // Prevent whitespace from collapsing
        charNode = '\u00A0'
      }
      return (
        <span
          className='Char'
          key={cursorNodeIndex}
          onClick={createCharClickHandler(cursorNodeIndex)}
        >
          {charNode}
          {isCursorVisible && <Cursor />}
        </span>
      )
    })
    return <div key={lineIndex} className='Line'>{chars}</div>
  })

  const handleClickDiv = () => {
    setIsFocused(true)
    setCursorIndex(valueText.length)
  }

  const divStyle = {
    border: isFocused ? '1px solid gray' : '1px solid transparent',
    borderRadius: '4px',
    padding: '4px',
    whiteSpace: 'pre-wrap',
  }

  return (
    <div className="Block" onClick={handleClickDiv} style={divStyle}>
      {lines}
    </div>
  )
}
