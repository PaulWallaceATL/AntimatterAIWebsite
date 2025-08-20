"use client"

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}


