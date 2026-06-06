import { cn } from '@/lib/utils'

const V: Record<string, string> = {
  gold:   'badge-gold',
  green:  'badge-green',
  red:    'badge-red',
  blue:   'badge-blue',
  purple: 'badge-purple',
  gray:   'badge-gray',
  cyan:   'badge-cyan',
}

interface BadgeProps {
  children:  React.ReactNode
  variant?:  string
  className?: string
  dot?:      boolean
}

export default function Badge({ children, variant = 'gray', className = '', dot }: BadgeProps) {
  return (
    <span className={cn('badge', V[variant] || V.gray, className)}>
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: 'currentColor', opacity: 0.8 }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}