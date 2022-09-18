import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDialogRoute } from '../hooks/useDialogRoute'
import Dialog from './Dialog'
import { About, Open, Save } from './Dialogs'

export default function DialogRouter() {
  const {dialogRoute, setDialogRoute} = useDialogRoute()

  return <AnimatePresence>
    {dialogRoute === 'open' && <Dialog><Open /></Dialog>}
    {dialogRoute === 'save' && <Dialog><Save /></Dialog>}
    {dialogRoute === 'about' && <Dialog><About /></Dialog>}
  </AnimatePresence>
}