import { forwardRef } from 'react'
import './Cursor.css'

export const Cursor = forwardRef<HTMLSpanElement, object>((_, ref) => {
  return <span className="Cursor" ref={ref} />
})
