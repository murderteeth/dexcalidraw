
const word = 'Dexcalidraw'

export default function Wordmark({ glow, className }: { glow?: boolean, className: string }) {
  return <div className={`
    relative flex items-center justify-center ${className}`}>
    <div className={`
      ${glow ? 'invisible' : ''}
      font-[Virgil] font-bold text-purple-500
      drop-shadow-lg`}>{word}</div>
    <div className={`
      ${glow ? '' : 'hidden'}
      absolute z-10 inset-1
      font-[Virgil] font-bold
      text-stroke text-stroke-purple-500 text-fill-transparent
      drop-shadow-lg`}>{word}</div>
    <div className={`
      ${glow ? '' : 'hidden'}
      absolute z-[9] inset-1
      font-[Virgil] font-bold
      text-stroke text-stroke-purple-500 text-fill-transparent
      blur-md`}>{word}</div>
    <div className={`
      ${glow ? '' : 'hidden'}
      absolute z-[8] inset-1
      font-[Virgil] font-bold
      text-stroke text-stroke-purple-300/40 text-fill-transparent
      blur-3xl`}>{word}</div>
  </div>
}