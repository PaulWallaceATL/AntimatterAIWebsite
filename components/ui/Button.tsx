import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#696aac] text-white hover:bg-[#7a7bb8] focus-visible:ring-[#7a7bb8] ring-offset-[#0A0A0A]',
        secondary: 'bg-[#1c1c1c] text-white hover:bg-[#2c2c2c] focus-visible:ring-[#2c2c2c] ring-offset-[#0A0A0A]',
        outline: 'border border-[#696aac] text-[#a2a3e9] hover:bg-[#1a1a1a] focus-visible:ring-[#696aac] ring-offset-[#0A0A0A]',
        ghost: 'bg-transparent text-white hover:bg-[#141414] focus-visible:ring-[#2c2c2c] ring-offset-[#0A0A0A]',
        link: 'text-[#a2a3e9] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 py-2',
        md: 'h-10 px-6',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }), 'btn-glow')}
      ref={ref}
      {...props}
    >
      <span className="btn-shimmer">{props.children}</span>
    </Comp>
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }