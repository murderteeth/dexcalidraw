export default function Button(
  { onClick, disabled, className, children }: 
  { onClick?: () => void, disabled?: boolean, className?: string, children: any }) {
  return <button 
    onClick={onClick} 
    disabled={disabled}
    className={`
    px-6 py-3 flex items-center justify-center
    dark:text-purple-100 
    disabled:text-gray-400 dark:disabled:text-gray-600
    bg-[#eaecef] dark:bg-[#363636]
    hover:bg-[#ced4da] dark:hover:bg-[#272727]
    active:bg-[#adb5bd] active:dark:bg-[#222]
    rounded-lg cursor-pointer 
    disabled:cursor-default disabled:pointer-events-none
    ${className}`}>
    {children}
  </button>
}