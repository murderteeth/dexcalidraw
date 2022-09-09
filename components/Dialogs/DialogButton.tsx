export default function DialogButton({ onClick, children }: { onClick: () => void, children: any }) {
  return <button onClick={onClick} className={`
    p-2 text-2xl dark:text-purple-100 hover:text-slate-900 
    active:transform active:scale-95
    transition duration-200 rounded-full`}>
    {children}
  </button>
}