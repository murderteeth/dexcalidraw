import { useDexcalidraw } from "../../../hooks/useDexcalidraw"
import { useDialogRoute } from "../../../hooks/useDialogRoute"
import { Button } from "../../controls"

export default function FreePlan({ className }: { className: string }) {
  const { setDialogRoute } = useDialogRoute()
  const { subscription } = useDexcalidraw()

  return <div className={`
    flex flex-col items-center gap-8
    ${className}`}>
    <p className={'text-2xl'}>{'Thanks for using the Dexcalidraw Free Plan!'}</p>
    <div className={'flex flex-col items-center gap-2'}>
      <p>You are using</p>
      <div className={`inline px-2 py-1 
        text-4xl dark:text-white
        rounded-lg shadow-sm
        ${subscription.filled ? 'bg-red-400 dark:bg-red-500' : 'bg-purple-400 dark:bg-purple-500'}`}>
        {`${subscription.used} / ${subscription.max}`}
      </div>
      <p>of your free drawings</p>
    </div>
    {subscription.filled && <>
      <p className={'text-lg '}>
        {`Looks like you've used up all your free drawings. Did you know you can store up to 1 GB of drawings by upgrading to the Pendragon Plan?`}
      </p>
      <Button onClick={() => setDialogRoute('mint')}>{'Show me the Pendragon Plan'}</Button>
    </>}
  </div>
}