import { AiOutlineClose } from 'react-icons/ai'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { useDialogRoute } from '../../../hooks/useDialogRoute'
import { Button } from '../../controls'
import Wordmark from '../../Wordmark'
import DialogButton from '../DialogButton'
import Hexagon from './Hexagon'
import QR from './QR'
import erc20 from '../../../abi/erc20.json'
import { useDexcalidraw } from '../../../hooks/useDexcalidraw'
import { useEffect, useMemo } from 'react'

export default function Mint() {
  const { setDialogRoute } = useDialogRoute()
  const { appState } = useDexcalidraw()
  const darkMode = useMemo(() => appState?.theme === 'dark', [appState])
  const { account, isInitialized: isMoralisInitialized } = useMoralis()
  const { chain } = useDexcalidraw()

  function formatNumber(number : number, decimals = 2){
    return number.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})
  }

  const { 
    data: daiBalance, 
    runContractFunction: fetchDaiBalance,
    isLoading: isLoadingFetchDaiBalance,
    error: fetchDaiBalanceError
  } = useWeb3Contract({
    abi: erc20,
    contractAddress: chain.dai,
    functionName: 'balanceOf',
    params: { 
      '': '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E'
    },
    msgValue: 0,
  })

  useEffect(() => {
    if(isMoralisInitialized && !isLoadingFetchDaiBalance) {
      fetchDaiBalance()
    }
  }, [isMoralisInitialized, isLoadingFetchDaiBalance, fetchDaiBalance])

  useEffect(() => {
    if(fetchDaiBalanceError) console.error('fetchDaiBalanceError', fetchDaiBalanceError)
  }, [fetchDaiBalanceError])

  return <div className={'relative w-full flex flex-col'}>
    <div>
      <div className={`
        w-full px-8 flex items-center justify-end`}>
        <div className='flex items-center justify-end gap-8'>
          <DialogButton onClick={() => setDialogRoute('')}>
            <AiOutlineClose />
          </DialogButton>
        </div>
      </div>
    </div>

    <div className={`
      w-full h-full max-w-full max-h-full 
      flex items-center justify-center 
      dark:text-purple-500`}>

      <div className={'w-1/2 px-32 flex flex-col items-center gap-2'}>
        <Wordmark word={'Pendragon Plan'} className={'text-5xl'} glow={darkMode} shadow={!darkMode} />
        <p className={'text-lg'}>
          {'Subscribe to the Pendragon Plan now and store up to 2 GB of drawings for a year!'}
        </p>
        <div className={'relative flex items-center justify-center'}>
          <Hexagon className={'w-64 h-64 stroke-purple-500'} />
          <QR className={'absolute w-32 h-32 stroke-purple-500 fill-amber-400'} />
        </div>
        <div className={'flex flex-col items-center gap-4'}>
          <p>
            {'Your Balance is'}
            <span className={'mx-2 font-mono dark:text-purple-100'}>
              {daiBalance ? formatNumber(daiBalance) : '-.--'}
            </span>
            {'DAI'}
          </p>
          <Button>{'Subscribe now for 20 DAI'}</Button>
        </div>
      </div>

    </div>
  </div>
}