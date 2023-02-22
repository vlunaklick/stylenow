import { useState } from 'react'

export const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLODAING: 2,
  COMPLETE: 3,
}

export function useDragAndDrop() {
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)

  const handerDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  return {
    drag,
    handerDragEnter,
    handleDragLeave,
    handleDrop,
  }
}
