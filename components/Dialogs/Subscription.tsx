import { AiOutlineClose } from "react-icons/ai";
import { useDialogRoute } from "../../hooks/useDialogRoute";
import NFT from "../NFT";
import DialogButton from "./DialogButton";

export default function Subscription() {
  const { setDialogRoute } = useDialogRoute()

  return <div className={'relative w-full flex flex-col'}>
    <div>
      <div className={`
        w-full px-8 flex items-center justify-end`}>
        <div className="flex items-center justify-end gap-8">
          <DialogButton onClick={() => setDialogRoute('')}>
            <AiOutlineClose />
          </DialogButton>
        </div>
      </div>
    </div>

    <div className={`
      w-full h-full max-w-full max-h-full 
      flex flex-col items-center justify-center 
      dark:text-purple-500`}>
      <NFT className={'text-8xl'} />
    </div>
  </div>
}