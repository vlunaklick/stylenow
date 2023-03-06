/* eslint-disable @next/next/no-img-element */
const buttonClass =
  'w-full h-full border-2 border-slate-200 rounded-lg flex-1 min-w-[200px] group relative dark:border-slate-800 min-h-[130px] bg-white dark:bg-slate-900'

const imagesClass = 'w-full object-cover rounded-md'

const hoverClass =
  'absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out rounded-md'

export default function TestImage({ imgSrc, imgAlt, onClick }) {
  return (
    <button onClick={onClick} className={buttonClass}>
      <img
        src={imgSrc}
        alt={imgAlt}
        className={imagesClass}
        loading="lazy"
        draggable="false"
      />

      <div className={hoverClass}></div>
    </button>
  )
}
