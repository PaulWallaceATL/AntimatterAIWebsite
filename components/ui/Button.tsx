import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-main-3 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-main-3 text-neutral-7 hover:bg-main-4',
      secondary: 'bg-neutral-6 text-neutral-2 hover:bg-neutral-5',
      outline: 'border-2 border-main-3 text-main-3 hover:bg-main-3 hover:text-neutral-7'
    }
    
    const sizes = {
      sm: 'text-body-14 px-4 py-2 rounded-md',
      md: 'text-body-16 px-6 py-3 rounded-lg',
      lg: 'text-body-18 px-8 py-4 rounded-xl'
    }
    
    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button } 