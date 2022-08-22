export default function Wordmark({ className }: { className: string }) {
  return <h1 className={`
    font-[Virgil] font-bold
    bg-clip-text text-transparent 
    bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500
    drop-shadow-lg
    ${className}`}>Dexcalidraw</h1>
}