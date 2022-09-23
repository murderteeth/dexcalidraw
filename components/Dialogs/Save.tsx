import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMoralis, useMoralisFile, useNewMoralisObject } from 'react-moralis'
import Wordmark from '../Wordmark'
import { useDrawings } from '../../hooks/useDrawings'
import { AiOutlineClose } from 'react-icons/ai'
import Busy, { useBusy } from '../Busy'
import { useDialogRoute } from '../../hooks/useDialogRoute'
import DialogButton from './DialogButton'
import { useDexcalidraw } from '../../hooks/useDexcalidraw'
import { Button } from '../controls'
import Input from '../controls/Input'

export default function Open() {
  const { 
    excalidrawModule, 
    excalidrawApi,
    elements, 
    appState, 
    files, 
    currentDrawing, 
    setCurrentDrawing,
    refreshSubscription
  } = useDexcalidraw()

  const nameRef = useRef<HTMLInputElement>()
  const { busy, setBusy } = useBusy()
  const { setDialogRoute } = useDialogRoute()
  const { user } = useMoralis()
  const { saveFile } = useMoralisFile()
  const { save: saveDrawing, isSaving } = useNewMoralisObject('Drawing')
  const { drawings } = useDrawings()
  const [preview, setPreview] = useState<HTMLCanvasElement>()
  const previewMeasure = useRef<HTMLDivElement|null>(null)
  const [previewDimensions, setPreviewDimensions] = useState<{width: number, height: number}>({ width: 240, height: 240 })
  const [shhh, setShhh] = useState(true)

  const drawing = useMemo(() => {
    return drawings.find(drawing => drawing.id === currentDrawing.id)
  }, [drawings, currentDrawing])

  const [ipfsGatewayUrl, setIpfsGatewayUrl] = useState('')
  useEffect(() => {
    if(drawing) {
      const file = drawing.get('file')
      const hash = file._name?.replace('.txt', '')
      const url = `https://ipfs.moralis.io:2053/ipfs/${hash}`
      setIpfsGatewayUrl(url)
    }
  }, [drawing])

  const defaultName = useMemo(() => {
    if(currentDrawing.id) return currentDrawing.name
    else return `Drawing #${drawings.length + 1}`
  }, [drawings, currentDrawing])

  useEffect(() => {
    setTimeout(() => setShhh(false), 100)
  }, [setShhh])

  useEffect(() => {
    if(previewMeasure.current) {
      setPreviewDimensions({
        width: previewMeasure.current.clientWidth * 3 / 4,
        height: previewMeasure.current.clientHeight * 3 / 4
      })
    }
  }, [previewMeasure])

  useEffect(() => {
    if(!shhh && previewDimensions.width > 0 && excalidrawModule && appState) {
      excalidrawModule.exportToCanvas({
        elements, appState: {...appState, exportWithDarkMode: appState.theme === 'dark'}, files,
        getDimensions: (width: number, height: number) => {
          const scale = Math.max(previewDimensions.width / width, previewDimensions.height / height)
          return { width: scale * width, height: scale * height, scale }
        }
      }).then(canvas => {
        setPreview(canvas)
      })
    }
  }, [shhh, previewDimensions, excalidrawModule, elements, appState, files])

  useEffect(() => {
    setBusy(isSaving)
  }, [isSaving, setBusy])

  const onSaveDrawing = useCallback(async () => {
    const name = nameRef.current?.value
    if(!name) return

    setBusy(true)
    const file = await saveFile(
      name, 
      { base64: Buffer.from(JSON.stringify({ elements })).toString('base64') }, 
      { saveIPFS: true })
    if(!file) {
      excalidrawApi?.setToastMessage('Save failed!')
      throw 'Save failed!'
    }

    if(!currentDrawing.id) {
      const newDrawing = await saveDrawing({
        owner: user,
        name, file
      })

      if(!newDrawing) {
        excalidrawApi?.setToastMessage('Save failed!')
        throw 'Save failed!'
      }

      setCurrentDrawing({ id: newDrawing.id, name })
      excalidrawApi?.setToastMessage(`${name}.. saved`)
      refreshSubscription()
      // setBusy(false) <-- don't set false here.. let the isSaving effect hook handle it

    } else {
      if(!drawing) throw `You call that a drawing? ${currentDrawing.id}`
      drawing.set('name', name)
      drawing.set('file', file)
      await drawing.save()

      setCurrentDrawing({ ...currentDrawing, name })
      excalidrawApi?.setToastMessage(`${name}.. updated`)
      setBusy(false)

    }
  }, [
    nameRef, 
    saveFile,
    saveDrawing, 
    elements,
    drawing,
    currentDrawing,
    setCurrentDrawing,
    excalidrawApi,
    setBusy,
    user,
    refreshSubscription
  ])

  return <div className={'relative w-full flex flex-col'}>
    <Busy />

    <div>
      <div className={`
        w-full px-8 flex items-center justify-between text-purple-400 shadow-md`}>
        <Wordmark word={'Save your drawing..'} className={'text-2xl'} />
        <div className="flex items-center justify-end gap-8">
          <DialogButton onClick={() => setDialogRoute('')}>
            <AiOutlineClose />
          </DialogButton>
        </div>
      </div>
    </div>

    <div className={'w-full h-full max-w-full max-h-full flex items-center justify-center'}>
      <div className={`
        relative w-1/2 h-full flex items-center justify-center`}>
        <div className={`
          absolute z-0 inset-1 rounded-bl-lg
          bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAAH0lEQVQY02OcxQADZ+AsJgYsYKgIsiD8YTJInEShIAA1NwKQeKc4/QAAAABJRU5ErkJggg==)]
          dark:mix-blend-overlay`} />
        <div className={'absolute inset-1 p-16'}>
          <div ref={previewMeasure} className={'w-full h-full'} />
        </div>
        {preview && <img className={`z-10 rounded-lg shadow-lg`}
          src={preview.toDataURL()} alt={'preview'} />}
      </div>

      <div className={'w-1/2 flex items-center justify-center gap-2'}>
        <div className={'relative flex flex-col items-start'}>
          <Input _ref={nameRef} type={'text'} defaultValue={defaultName} disabled={busy} placeholder={'Name your drawing =)'}  />
          {ipfsGatewayUrl && <a className={`
            absolute -bottom-24 dark:text-purple-100/40 break-all`}
            href={ipfsGatewayUrl}
            target={'_blank'} rel={'noreferrer'}>
            {ipfsGatewayUrl}
          </a>}
        </div>
        <Button onClick={onSaveDrawing} disabled={busy}>{'Save'}</Button>
      </div>
    </div>

  </div>
}