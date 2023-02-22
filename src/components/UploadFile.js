import { useId } from 'react'

import { useImage } from '@/context/Image'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { DRAG_IMAGE_STATES } from '@/hooks/useDragAndDrop'

import { Upload } from './icons/Upload'

export default function UploadFile() {
  const inputUploadId = useId()

  const { handleDragImage, handleUploadImage } = useImage()

  const { drag, handerDragEnter, handleDragLeave, handleDrop } =
    useDragAndDrop()

  const isDragActive = drag === DRAG_IMAGE_STATES.DRAG_OVER

  const handleUploadFormOnDrop = e => {
    e.preventDefault()
    handleDrop(e)
    handleDragImage(e)
  }

  const handleUploadInput = e => {
    e.preventDefault()
    handleUploadImage(e)
  }

  return (
    <form
      onDragEnter={handerDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handerDragEnter}
      onDrop={handleUploadFormOnDrop}
      className={
        'flex flex-col items-center justify-center w-full h-full sm:min-w-[250px] p-4 border-2 border-dashed rounded-md ' +
        (isDragActive ? 'border-indigo-500' : 'border-gray-200')
      }
    >
      <label htmlFor="file-upload" className="sr-only">
        Upload file
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
      />
      <Upload
        className={
          'w-12 h-12 ' + (isDragActive ? 'fill-indigo-700' : 'fill-slate-600')
        }
      />
      <div className="flex text-sm text-gray-600 flex-wrap justify-center">
        <label
          htmlFor={inputUploadId}
          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span>Upload a file</span>
          <input
            id={inputUploadId}
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleUploadInput}
          />
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs text-gray-500 text-center">
        PNG, JPG, GIF up to 10MB
      </p>
    </form>
  )
}
