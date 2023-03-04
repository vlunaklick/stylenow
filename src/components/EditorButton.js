const VARIANT = {
  primary:
    'border-slate-400 text-slate-600 hover:text-slate-700 hover:border-slate-500',
  secondary:
    'border-slate-200 text-slate-500 hover:text-slate-600 hover:border-slate-300',
}

export default function EditorButton({
  children,
  onClick,
  variant = 'primary',
}) {
  return (
    <button
      className={
        'rounded flex-1 border-2 p-1 transition-colors' + ' ' + VARIANT[variant]
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}
