import { useId } from 'react'

import { useImage } from '@/context/Image'
import { useDropzone } from '@/hooks/useDropzone'
import { useNavigation } from '@/hooks/useNavigation'

import { uploadImage } from '@/services/cloudinary'

import { Upload } from './icons/Upload'

export default function UploadFile() {
  const inputUploadId = useId()

  const {
    error,
    isDragActive,
    isUploading,
    isError,
    onDragEnter,
    onDragLeave,
    onDrop,
    onInput,
  } = useDropzone()

  const { navigateToEditor } = useNavigation()

  const { handlePublicId } = useImage()

  const handleUploadFormOnDrop = e => {
    e.preventDefault()

    onDrop(e, file => {
      return uploadImage(file).then(res => {
        const { public_id: publicId } = res

        handlePublicId(publicId)
        navigateToEditor()
      })
    })
  }

  const handleUploadInput = async e => {
    e.preventDefault()

    onInput(e, file => {
      return uploadImage(file).then(res => {
        const { public_id: publicId } = res

        handlePublicId(publicId)
        navigateToEditor()
      })
    })
  }

  return (
    <form
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={handleUploadFormOnDrop}
      className={
        'flex flex-col items-center justify-center w-full h-full sm:min-w-[250px] min-h-[200px] p-4 border-2 border-dashed rounded-md bg-white/80 dark:bg-slate-900/80 dark:border-slate-800 ' +
        (isDragActive ? 'border-indigo-500' : 'border-slate-200') +
        (isUploading ? ' opacity-50 pointer-events-none' : '')
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
          'w-12 h-12 ' +
          (isDragActive
            ? 'fill-indigo-700 dark:fill-indigo-500'
            : 'fill-slate-500 dark:fill-slate-400')
        }
      />
      <div className="flex text-sm text-slate-600 flex-wrap justify-center dark:text-slate-500">
        <label
          htmlFor={inputUploadId}
          className={
            'relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 ' +
            (isError ? ' text-red-500 hover:text-red-400' : '')
          }
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
      <p className="text-xs text-slate-500 text-center dark:text-slate-400">
        PNG, JPG, GIF up to 10MB
      </p>
    </form>
  )
}
