import { BsHexagonFill } from "react-icons/bs";

export default function NFT({ onClick, className }: { onClick?: () => void, className?: string }) {
  return <BsHexagonFill onClick={onClick} className={`
    rotate-90 text-purple-800
    hover:text-amber-400
    active:transform active:scale-95
    transition duration-200
    drop-shadow cursor-pointer
    ${className}`} />
}