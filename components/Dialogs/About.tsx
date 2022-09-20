import { useMemo } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDialogRoute } from '../../hooks/useDialogRoute'
import { useDexcalidraw } from '../../hooks/useDexcalidraw'
import Wordmark from '../Wordmark'
import DialogButton from './DialogButton'

export default function About() {
  const { setDialogRoute } = useDialogRoute()
  const { appState } = useDexcalidraw()
  const darkMode = useMemo(() => appState?.theme === 'dark', [appState])

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
      <Wordmark className={'text-8xl'} glow={darkMode} shadow={!darkMode} />
      <p className={'my-4 text-2xl'}>
        {'Access your Excalidraw work anywhere'}
      </p>

      <div className={'my-4 text-xl'}>
        <a className={'flex flex-col gap-2 items-center justify-center'} href={'https://github.com/murderteeth/dexcalidraw'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-16 dark:invert'} src={'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/github-icon.svg'} alt={'excalidraw'} />
        </a>
      </div>

      <div className={'mt-12 mb-4'}>{'Greatfully made with'}</div>
      <div className={'flex items-center justify-center gap-10'}>
        <a className={'flex items-center gap-3'} href={'https://github.com/excalidraw/excalidraw'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-12 dark:invert'} src={'https://raw.githubusercontent.com/excalidraw/excalidraw/master/dev-docs/static/img/logo.svg'} alt={'excalidraw'} />
          <div className={'font-[Virgil] font-bold text-2xl dark:text-white'}>{'Excalidraw'}</div>
        </a>
        <a href={'https://moralis.io/'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-10'} src={'https://raw.githubusercontent.com/MoralisWeb3/Moralis-JS-SDK/fdf9fd06391eac82987765628a9a313a1ed008f3/demos/nextjs/public/Moralis-Logo-LightBG.svg'} alt={'moralis'} />
        </a>
        <a href={'https://ipfs.tech/'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-10 invert dark:invert-0'} src={'https://raw.githubusercontent.com/ipfs/ipfs-docs/main/docs/.vuepress/public/images/ipfs-logo-text.svg'} alt={'ipfs'} />
        </a>
        <a href={'https://nextjs.org/'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-14 dark:invert'} src={'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg'} alt={'nextjs'} />
        </a>
        <a href={'https://tailwindcss.com/'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-6'} src={`https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo-${darkMode ? 'dark' : 'light'}.svg`} alt={'tailwindcss'} />
        </a>
      </div>

      <div className={'mt-12 mb-4'}>{'Available on'}</div>
      <div className={'flex items-center justify-center gap-10'}>
        <a href={'https://ethereum.org/'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-12 dark:invert'} src={'https://ethereum.org/static/8ea7775026f258b32e5027fe2408c49f/57723/ethereum-logo-landscape-black.png'} alt={'ethereum'} />
        </a>
        <a href={'https://polygon.technology/'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-8'} src={`https://polygon.technology/_nuxt/img/${darkMode ? 'polygon-logo-white.a8997ce.svg' : 'polygon-logo.99647ca.svg'}`} alt={'polygon'} />
        </a>
        <a href={'https://www.fantom.foundation/'} target={'_blank'} rel={'noreferrer'}>
          <img className={'h-8'} src={`https://www.fantom.foundation/wp-content/themes/fantom-web/images/logo/${darkMode ? 'fantom-logo-white.svg' : 'fantom-logo-blue-without-background.svg'}`} alt={'fantom'} />
        </a>
      </div>
    </div>
  </div>
}