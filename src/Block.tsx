import { CSSProperties, useEffect, useState } from 'react'

import './Block.css'
import { Cursor } from './Cursor'
import { createKeyHandler } from './keyHandler'

const spanStyle: CSSProperties = {
  position: 'relative',
}

export function Block() {
  const initialValueText = 'lorem ipsum dolor sit amet'
  const [valueText] = useState(initialValueText)
  const [isFocused, setIsFocused] = useState(false)
  const [cursorIndex, setCursorIndex] = useState(0)

  useEffect(() => {
    if (!isFocused) return
    const onKeyDown = createKeyHandler({ cursorIndex, setCursorIndex, valueText })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [cursorIndex, isFocused, valueText])

  const createSpanClickHandler = (index: number) => {
    return () => {
      setIsFocused(true)
      setCursorIndex(index)
    }
  }

  const valueNodes = valueText.split('').concat('').map((char, index) => {
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
