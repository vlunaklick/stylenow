import { useState, useEffect } from 'react'

const DROP_ZONE_STATE = {
  IDLE: 'IDLE',
  DRAGGING: 'DRAGGING',
  ERROR: 'ERROR',
  UPLOADING: 'UPLOADING',
  COMPLETE: 'COMPLETE',
}

export function useDropzone() {
  const [dropzoneState, setDropzoneState] = useState(DROP_ZONE_STATE.IDLE)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (dropzoneState === DROP_ZONE_STATE.ERROR) {
      const timer = setTimeout(() => {
        setDropzoneState(DROP_ZONE_STATE.IDLE)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [dropzoneState])

  const onDragEnter = e => {
    e.preventDefault()
    setDropzoneState(DROP_ZONE_STATE.DRAGGING)
  }

  const onDragLeave = e => {
    e.preventDefault()
    setDropzoneState(DROP_ZONE_STATE.IDLE)
  }

  const onDrop = async (e, callback) => {
    e.preventDefault()

    if (!e.dataTransfer || !e.dataTransfer.files || !e.dataTransfer.files[0]) {
      return
    }

    const file = e.dataTransfer.files[0]

    if (file.type && !file.type.includes('image')) {
      setError('Only images are allowed')
      setDropzoneState(DROP_ZONE_STATE.ERROR)
      return
    }

    setDropzoneState(DROP_ZONE_STATE.UPLOADING)

    try {
      await callback(file)
      setDropzoneState(DROP_ZONE_STATE.COMPLETE)
      setError(null)
    } catch (err) {
      setDropzoneState(DROP_ZONE_STATE.ERROR)
      setError(err)
    }
  }

  const onInput = async (e, callback) => {
    e.preventDefault()

    if (!e.target || !e.target.files || !e.target.files[0]) {
      return
    }

    const file = e.target.files[0]

    if (file.type && !file.type.includes('image')) {
      setError('Only images are allowed')
      setDropzoneState(DROP_ZONE_STATE.ERROR)
      return
    }

    setDropzoneState(DROP_ZONE_STATE.UPLOADING)

    try {
      await callback(file)
      setDropzoneState(DROP_ZONE_STATE.COMPLETE)
      setError(null)
    } catch (err) {
      setDropzoneState(DROP_ZONE_STATE.ERROR)
      setError(err)
    }
  }

  const isDragActive = dropzoneState === DROP_ZONE_STATE.DRAGGING

  const isUploading = dropzoneState === DROP_ZONE_STATE.UPLOADING

  const isError = dropzoneState === DROP_ZONE_STATE.ERROR

  return {
    error,
    isDragActive,
    isUploading,
    isError,
    onDragEnter,
    onDragLeave,
    onDrop,
    onInput,
  }
}
