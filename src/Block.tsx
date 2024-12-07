import { useEffect, useState } from 'react'

import './Block.css'
import { Cursor } from './Cursor'
import { createKeyHandler } from './keyHandler'
import { getClickSide } from './getClickSide'

const initialValueText = `The technological singularity—or simply the singularity[1]—is a hypothetical future point in time at which technological growth becomes uncontrollable and irreversible, resulting in unforeseeable consequences for human civilization.[2][3] According to the most popular version of the singularity hypothesis, I. J. Good's intelligence explosion model of 1965, an upgradable intelligent agent could eventually enter a positive feedback loop of self-improvement cycles, each successive; and more intelligent generation appearing more and more rapidly, causing a rapid increase ("explosion") in intelligence which would ultimately result in a powerful superintelligence, qualitatively far surpassing all human intelligence.[4]`

export function Block() {
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

  const blockStyle = {
    border: isFocused ? '1px solid gray' : '1px solid transparent',
  }

  return (
    <div className="Block" onClick={handleClickDiv} style={blockStyle}>
      {lines}
    </div>
  )
}
