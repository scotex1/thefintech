import { cn } from '@/lib/utils'
import { CSSProperties, ReactNode } from 'react'

interface CardProps {
  children:   ReactNode
  className?: string
  gold?:      boolean
  hover?:     boolean
  onClick?:   () => void
  style?:     CSSProperties
  padding?:   'none' | 'sm' | 'md' | 'lg'
}

const padMap = { none: 'p-0', sm: 'p-4', md: 'p-5 md:p-6', lg: 'p-6 md:p-8' }

export default function Card({ children, className, gold, hover, onClick, style, padding = 'md' }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={cn(
        'surface transition-all duration-200',
        padMap[padding],
        gold  && 'surface-gold',
        hover && 'hover:border-[rgba(212,168,83,0.2)] hover:bg-[var(--bg-overlay)] hover:shadow-[var(--shadow-md)]',
        onClick && 'cursor-pointer select-none active:scale-[0.99]',
        className
      )}
    >
      {children}
    </div>
  )
}