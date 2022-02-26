import { motion } from 'framer-motion'

const variants = {
   hidden: { opacity: 0, x: 0, y: 20 },
   enter: { opacity: 1, x: 0, y: 0 },
   exit: { opacity: 0, x: 0, y: 20 },
}

export const Animate = (props) => {
   return (
      <motion.div
         initial='hidden'
         animate='enter'
         exit='exit'
         variants={variants}
         transition={{ duration: 0.5, type: 'easeInOut' }}
         className={props.className}
         id={props.id}
      >
         {props.children}
      </motion.div>
   )
}
