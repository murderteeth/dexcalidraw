import { AiOutlineClose } from 'react-icons/ai'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { useDialogRoute } from '../../../hooks/useDialogRoute'
import { Button } from '../../controls'
import Wordmark from '../../Wordmark'
import DialogButton from '../DialogButton'
import { useDexcalidraw } from '../../../hooks/useDexcalidraw'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import erc20 from '../../../abi/erc20.json'
import subscriptions from '../../../abi/subscriptions.json'
import Busy, { useBusy } from '../../Busy'
import Pendragon from '../../Pendragon'

export default function Mint() {
  const { busy, setBusy } = useBusy()
  const { setDialogRoute } = useDialogRoute()
  const { appState, subscription, refreshSubscription } = useDexcalidraw()
  const darkMode = useMemo(() => appState?.theme === 'dark', [appState])
  const fee = useMemo(() => ethers.utils.parseEther('10'), [])
  const { account, isInitialized: isMoralisInitialized } = useMoralis()
  const { chain } = useDexcalidraw()
  const [daiBalance, setDaiBalance] = useState(BigNumber.from('-1'))
  const [allowance, setAllowance] = useState(BigNumber.from('-1'))

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
    data: allowanceRaw,
    runContractFunction: fetchAllowance,
    isLoading: isLoadingFetchAllowance,
    isFetching: isFetchingAllowance,
    error: fetchAllowanceError
  } = useWeb3Contract({
    abi: erc20,
    contractAddress: chain.dai,
    functionName: 'allowance',
    params: { 
      'owner': account,
      'spender': chain.subscriptions
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
    if(isMoralisInitialized && !isLoadingFetchDaiBalance) {
      fetchAllowance()
    }
  }, [isMoralisInitialized, isLoadingFetchDaiBalance, fetchAllowance])

  useEffect(() => {
    if(allowanceRaw) setAllowance(allowanceRaw as BigNumber)
  }, [allowanceRaw])

  const [isConfirmingApproval, setIsConfirmingApproval] = useState(false)
  useEffect(() => {
    if(approveDaiResult) {
      setIsConfirmingApproval(true);
      (approveDaiResult as any).wait(2).then(() => {
        setIsConfirmingApproval(false)
        setBusy(false)
        fetchAllowance()
      })
    }
  }, [approveDaiResult, fetchAllowance, setBusy, setIsConfirmingApproval])

  useEffect(() => {
    if(approveDaiError) setBusy(false)
  }, [approveDaiError, setBusy])

  const [isConfirmingSubscription, setIsConfirmingSubscription] = useState(false)
  useEffect(() => {
    if(subscribeResult) {
      setIsConfirmingSubscription(true);
      (subscribeResult as any).wait(2).then(() => {
        setTimeout(() => {
          refreshSubscription()
          fetchDaiBalance()
          fetchAllowance()
          setTimeout(() => {
            setIsConfirmingSubscription(false)
            setBusy(false)
            setDialogRoute('thanks')
          }, 1000) // UGH
        }, 1000) // ugh
      })
    }
  }, [subscribeResult, refreshSubscription, fetchDaiBalance, fetchAllowance, setIsConfirmingSubscription, setDialogRoute, setBusy])

  useEffect(() => {
    if(subscribeError) setBusy(false)
  }, [subscribeError, setBusy])

  const onApprove = useCallback(() => {
    if(!isLoadingApproveDai) {
      setBusy(true)
      approveDai()
    }
  }, [isLoadingApproveDai, approveDai, setBusy])

  const onSubscribe = useCallback(() => {
    if(!isLoadingSubscribe) {
      setBusy(true)
      subscribe()
    }
  }, [isLoadingSubscribe, subscribe, setBusy])

  return <div className={'relative w-full flex flex-col'}>
    <Busy />
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
          {!renewal && 'Subscribe to the Pendragon Plan for 10 DAI and store up to 1 GB of drawings for a year!'}
          {renewal && 'Renew the Pendragon Plan now and continue storing up to 1 GB of drawings for another year.'}
        </p>
        <div className={'relative flex items-center justify-center'}>
          <Pendragon className={'w-64 h-64 stroke-purple-500 fill-red-400 dark:fill-red-600'} />
        </div>
        <div className={'flex flex-col items-center gap-4'}>
          <p>
            {'Your Balance is'}
            <span className={'mx-2 font-mono dark:text-purple-100'}>
              {daiBalance ? formatDai(daiBalance).toString() : '-.--'}
            </span>
            {'DAI'}
          </p>

          <div className={'flex items-center gap-4'}>
            <Button onClick={onApprove}
              disabled={busy || daiBalance.lt(fee) || allowance.gte(fee) || isApprovingDai || isConfirmingApproval}
              className={`w-48 ${(isApprovingDai || isConfirmingApproval) ? 'dark:disabled:text-red-400' : ''}`}>
              {isApprovingDai ? 'Approving 10 DAI..' : isConfirmingApproval ? 'Confirming..' : allowance.gte(fee) ? '10 DAI Approved' : 'Approve 10 DAI'}
            </Button>

            <Button onClick={onSubscribe}
              disabled={busy || daiBalance.lt(fee) || allowance.lt(fee) || isSubscribing || isConfirmingSubscription}
              className={`w-48 ${(isSubscribing || isConfirmingSubscription) ? 'dark:disabled:text-red-400' : ''}`}>
              {isSubscribing ? 'Minting NFT..' : isConfirmingSubscription ? 'Confirming..' : renewal ? 'Renew' : 'Subscribe'}
            </Button>
          </div>

          {daiBalance.gte(0) && daiBalance.lt(fee) && <p className={'text-red-400'}>{'DAI balance too low'}</p>}

        </div>
      </div>

    </div>
  </div>
}