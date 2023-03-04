import EditorButton from './EditorButton'

export default function EditorFilter({
  children,
  name,
  category,
  categorySelected,
  handleCategory,
}) {
  return (
    <div className="flex gap-2 w-full flex-col">
      <EditorButton variant="primary" onClick={() => handleCategory(category)}>
        <span className="flex items-center gap-1 font-medium px-1">{name}</span>
      </EditorButton>

      {categorySelected === category && (
        <div className="flex items-center gap-2 w-full flex-wrap">
          {children}
        </div>
      )}
    </div>
  )
}
