import { cn } from '@/lib/utils'
import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, id, ...p }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="caption font-semibold" style={{ color: 'var(--text-2)', letterSpacing: '0.02em' }}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn('input select', error && '!border-[var(--red)]', className)}
          {...p}
        >
          {children}
        </select>
        {error && <p className="caption" style={{ color: 'var(--red)' }}>{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
export default Select