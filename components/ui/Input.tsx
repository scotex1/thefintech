
'use client'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="caption font-semibold"
            style={{ color: 'var(--text-2)', letterSpacing: '0.02em' }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className="input"
            {...props}
          />
        </div>
        {hint && !error && (
          <p className="caption" style={{ color: 'var(--text-3)' }}>{hint}</p>
        )}
        {error && (
          <p className="caption" style={{ color: 'var(--red, #EF4444)' }}>{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
