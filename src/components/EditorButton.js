const VARIANT = {
  primary:
    'border-slate-400 text-slate-600 hover:text-slate-700 hover:border-slate-500 dark:border-slate-600 dark:text-slate-300 dark:hover:text-slate-200 dark:hover:border-slate-500',
  secondary:
    'border-slate-200 text-slate-500 hover:text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-700',
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
