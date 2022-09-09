import { motion } from 'framer-motion'
import { useDialogRoute } from '../hooks/useDialogRoute'

export default function Dialog({ children }: { children: any }) {
  const {setDialogRoute} = useDialogRoute()

  return <>
    <div className={'absolute inset-1 z-[49] backdrop-blur-md'} />
    <motion.div className={`
      absolute inset-1 z-50`}
      transition={{ ease: 'easeInOut', duration: .1}}
      initial={{ opacity: .5, scale: .95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: .95 }}>
      <div onClick={() => setDialogRoute('')} className={'absolute inset-1 z-0'} />
      <div className={'absolute z-10 inset-8 flex bg-white dark:bg-[#1d1d1d] rounded-lg shadow-lg'}>
        {children}
      </div>
    </motion.div>
  </>
}