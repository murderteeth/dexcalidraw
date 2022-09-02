export default function Button(
  { onClick, className, children }: 
  { onClick?: () => void, className?: string, children: any }) {
  return <div className={'relative group'}>
    <div className={`
      invisible 
      px-6 py-3 flex items-center justify-center gap-6
      border-2 border-transparent whitespace-nowrap shadow rounded-full
      ${className}`}>
      {children}
    </div>
    <button onClick={onClick} className={`
      absolute z-10 inset-1
      px-6 py-3 flex items-center justify-center gap-6
      whitespace-nowrap
      group-hover:bg-slate-900 
      border-2 border-purple-500
      text-purple-500 
      active:transform active:scale-95
      transition duration-200
      shadow rounded-full
      ${className}`}>
      {children}
    </button>
    <div className={`
      absolute z-[9] inset-1
      px-6 py-3 flex items-center justify-center gap-6
      border-2 border-transparent group-hover:border-purple-300
      transition duration-200
      blur-md rounded-full`}>
    </div>
  </div>
}