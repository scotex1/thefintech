import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:   string
  error?:   string
  hint?:    string
  prefix?:  string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, className, id, ...p }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="caption font-semibold" style={{ color: 'var(--text-2)', letterSpacing: '0.02em' }}>
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm mono" style={{ color: 'var(--text-3)' }}>
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input',
              prefix && 'pl-9',
              error  && '!border-[var(--red)] focus:!box-shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
              className
            )}
            {...p}
          />
        </div>
        {error && <p className="caption" style={{ color: 'var(--red)' }}>{error}</p>}
        {hint  && !error && <p className="caption">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
export default Input