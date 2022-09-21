export default function Wordmark(
  { word = 'Dexcalidraw', shadow = false, glow = false, className = '' }: 
  { word?: string, shadow?: boolean, glow?: boolean, className?: string }) {
  return <div className={`
    relative flex items-center justify-center ${className}`}>
    <div className={`
      ${glow ? 'invisible' : ''}
      font-[Virgil] font-bold text-purple-500 
      whitespace-nowrap
      ${shadow ? 'drop-shadow-lg' : ''}`}>{word}</div>
    <div className={`
      ${glow ? '' : 'hidden'}
      absolute z-10 inset-1
      font-[Virgil] font-bold
      text-stroke text-stroke-purple-500 text-fill-transparent
      whitespace-nowrap
      ${shadow ? 'drop-shadow-lg' : ''}`}>{word}</div>
    <div className={`
      ${glow ? '' : 'hidden'}
      absolute z-[9] inset-1
      font-[Virgil] font-bold
      text-stroke text-stroke-purple-500 text-fill-transparent
      whitespace-nowrap blur-md`}>{word}</div>
    <div className={`
      ${glow ? '' : 'hidden'}
      absolute z-[8] inset-1
      font-[Virgil] font-bold
      text-stroke text-stroke-purple-300/40 text-fill-transparent
      whitespace-nowrap blur-3xl`}>{word}</div>
  </div>
}