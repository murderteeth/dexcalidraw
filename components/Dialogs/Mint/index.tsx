import { AiOutlineClose } from 'react-icons/ai'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { useDialogRoute } from '../../../hooks/useDialogRoute'
import { Button } from '../../controls'
import Wordmark from '../../Wordmark'
import DialogButton from '../DialogButton'
import Hexagon from './Hexagon'
import QR from './QR'
import { useDexcalidraw } from '../../../hooks/useDexcalidraw'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import erc20 from '../../../abi/erc20.json'
import subscriptions from '../../../abi/subscriptions.json'

export default function Mint() {
  const { setDialogRoute } = useDialogRoute()
  const { appState, subscription } = useDexcalidraw()
  const darkMode = useMemo(() => appState?.theme === 'dark', [appState])
  const fee = useMemo(() => ethers.utils.parseEther('10'), [])
  const { account, isInitialized: isMoralisInitialized } = useMoralis()
  const { chain } = useDexcalidraw()
  const [daiBalance, setDaiBalance] = useState(BigNumber.from('-1'))
  const [resetFlow, setResetFlow] = useState(false)
  const renewal = useMemo(() => {
    return !(subscription.nft.token === 0 || subscription.nft.expired)
  }, [subscription])

  function formatDai(balance: BigNumber){
    return parseFloat(ethers.utils.formatEther(balance))
      .toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})
  }

  const { 
    data: daiBalanceRaw,
    runContractFunction: fetchDaiBalance,
    isLoading: isLoadingFetchDaiBalance
  } = useWeb3Contract({
    abi: erc20,
    contractAddress: chain.dai,
    functionName: 'balanceOf',
    params: { 
      '': account
    },
    msgValue: 0,
  })

  useEffect(() => {
    if(isMoralisInitialized && !isLoadingFetchDaiBalance) {
      fetchDaiBalance()
    }
  }, [isMoralisInitialized, isLoadingFetchDaiBalance, fetchDaiBalance])

  useEffect(() => {
    if(daiBalanceRaw) setDaiBalance(daiBalanceRaw as BigNumber)
  }, [daiBalanceRaw])

  const {
    data: approveDaiResult,
    runContractFunction: approveDai,
    isLoading: isLoadingApproveDai,
    isFetching: isApprovingDai,
    error: approveDaiError
  } = useWeb3Contract({
    abi: erc20,
    contractAddress: chain.dai,
    functionName: 'approve',
    params: { 
      'usr': chain.subscriptions,
      'wad': fee
    },
    msgValue: 0,
  })

  const { 
    data: subscribeResult,
    runContractFunction: subscribe,
    isLoading: isLoadingSubscribe,
    isFetching: isSubscribing,
    error: subscribeError
  } = useWeb3Contract({
    abi: subscriptions,
    contractAddress: chain.subscriptions,
    functionName: 'subscribe',
    params: {},
    msgValue: 0,
  })

  useEffect(() => {
    if(subscribeError) setResetFlow(true)
  }, [subscribeError, setResetFlow])

  useEffect(() => {
    if(approveDaiResult && !isLoadingSubscribe && !resetFlow) {
      subscribe()
    }
  }, [approveDaiResult, isLoadingSubscribe, subscribe, resetFlow])

  useEffect(() => {
    if(subscribeResult) {
      fetchDaiBalance()
    }
  }, [subscribeResult, fetchDaiBalance])

  const onStartFlow = useCallback(async () => {
    if(!isLoadingApproveDai) {
      setResetFlow(false)
      approveDai()
    }
  }, [isLoadingApproveDai, setResetFlow, approveDai])

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
          {!renewal && 'Subscribe to the Pendragon Plan now and store up to 1 GB of drawings for a year!'}
          {renewal && 'Renew the Pendragon Plan now and continue storing up to 1 GB of drawings for another year.'}
        </p>
        <div className={'relative flex items-center justify-center'}>
          <Hexagon className={'w-64 h-64 stroke-purple-500'} />
          <QR className={'absolute w-32 h-32 stroke-purple-500 fill-amber-400'} />
        </div>
        <div className={'flex flex-col items-center gap-4'}>
          <p>
            {'Your Balance is'}
            <span className={'mx-2 font-mono dark:text-purple-100'}>
              {daiBalance ? formatDai(daiBalance).toString() : '-.--'}
            </span>
            {'DAI'}
          </p>

          <Button onClick={onStartFlow} 
            disabled={daiBalance.lt(fee) || isApprovingDai || isSubscribing}
            className={`w-96 ${(isApprovingDai || isSubscribing) ? 'dark:disabled:text-red-400' : ''}`}>
            {isApprovingDai ? 'Approving 10 DAI..' : isSubscribing ? 'Minting NFT..' : renewal ? 'Renew for 10 DAI' : 'Subscribe now for 10 DAI'}
          </Button>

          {daiBalance.gte(0) && daiBalance.lt(fee) && <p className={'text-red-400'}>{'DAI balance too low'}</p>}

        </div>
      </div>

    </div>
  </div>
}