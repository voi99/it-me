import { motion } from 'framer-motion'

const variants = {
   hidden: { opacity: 0, x: 0, y: 20 },
   enter: { opacity: 1, x: 0, y: 0 },
   exit: { opacity: 0, x: 0, y: 20 },
}

export const Animate = ({ className, id, children, duration = 0.4 }) => {
   return (
      <motion.div
         initial='hidden'
         animate='enter'
         exit='exit'
         variants={variants}
         transition={{ duration: duration, type: 'easeInOut' }}
         className={className}
         id={id}
      >
         {children}
      </motion.div>
   )
}
