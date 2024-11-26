import { CSSProperties, useState } from 'react'

import './Block.css'
import { Cursor } from './Cursor'

const spanStyle: CSSProperties = {
  position: 'relative',
}

export function Block() {
  const [valueText] = useState('lorem ipsum dolor sit amet')
  const [isFocused, setIsFocused] = useState(false)
  const [cursorIndex, setCursorIndex] = useState(0)

  const createSpanClickHandler = (index: number) => {
    return () => {
      setIsFocused(true)
      setCursorIndex(index)
    }
  }

  const valueNodes = valueText.split('').map((char, index) => {
    const hasCursor = cursorIndex === index
    const isCursorVisible = isFocused && hasCursor
    return (
      <span
        key={index}
        onClick={createSpanClickHandler(index)}
        style={spanStyle}
      >
        {char}
        {isCursorVisible && <Cursor />}
      </span>
    )
  })

  const handleClickDiv = () => {
    setIsFocused(true)
  }

  const divStyle = {
    border: isFocused ? '1px solid gray' : '1px solid transparent',
    borderRadius: '4px',
    padding: '4px',
  }

  return <div onClick={handleClickDiv} style={divStyle}>{valueNodes}</div>
}
