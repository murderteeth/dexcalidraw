import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useDialogRoute } from '../hooks/useDialogRoute'
import Dialog from './Dialog'
import { About, Mint, Open, Save, Subscription, Thanks } from './Dialogs'

export default function DialogRouter() {
  const { dialogRoute } = useDialogRoute()

  return <AnimatePresence>
    {dialogRoute === 'about' && <Dialog><About /></Dialog>}
    {dialogRoute === 'mint' && <Dialog><Mint /></Dialog>}
    {dialogRoute === 'open' && <Dialog><Open /></Dialog>}
    {dialogRoute === 'save' && <Dialog><Save /></Dialog>}
    {dialogRoute === 'subscription' && <Dialog><Subscription /></Dialog>}
    {dialogRoute === 'thanks' && <Dialog><Thanks /></Dialog>}
  </AnimatePresence>
}