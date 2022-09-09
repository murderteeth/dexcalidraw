import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDialogRoute } from '../hooks/useDialogRoute'
import Dialog from './Dialog'
import { Open, Save } from './Dialogs'

export default function DialogRouter() {
  const {dialogRoute, setDialogRoute} = useDialogRoute()

  return <AnimatePresence>
    {dialogRoute === 'open' && <Dialog><Open /></Dialog>}
    {dialogRoute === 'save' && <Dialog><Save /></Dialog>}
  </AnimatePresence>
}