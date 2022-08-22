export default function Button(
  { onClick, className, children }: 
  { onClick: () => void, className?: string, children: any }) {
  return <button onClick={onClick} className={`
    px-6 py-3 flex items-center justify-center gap-6 whitespace-nowrap
    bg-black/20 text-slate-100
    hover:bg-amber-400 hover:text-slate-900
    active:transform active:scale-95
    transition duration-200
    rounded-lg
    ${className}`}>
    {children}
  </button>
}