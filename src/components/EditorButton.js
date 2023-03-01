export default function EditorButton({ children, onClick }) {
  return (
    <button
      className="h-min rounded border-slate-300 border-2 p-1 text-slate-600 hover:text-slate-700 hover:border-slate-400 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
