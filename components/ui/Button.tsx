'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger'
  size?:    'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const V: Record<string, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost:   'btn-ghost',
  danger:  'btn-danger',
}
const S: Record<string, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, children, className, ...p }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn('btn', V[variant], S[size], className)}
      {...p}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
export default Button