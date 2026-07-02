import { cn } from '@/lib/utils'

interface StatCardProps {
  label:      string
  value:      React.ReactNode
  sub?:       string
  icon?:      string
  color?:     string
  className?: string
  loading?:   boolean
}

export default function StatCard({ label, value, sub, icon, color = 'var(--gold)', className, loading }: StatCardProps) {
  return (
    <div className={cn('surface stat-card p-5 md:p-6', className)}>
      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-8 w-24 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-3">
            <p className="label">{label}</p>
            {icon && <span className="text-xl opacity-60" aria-hidden="true">{icon}</span>}
          </div>
          <p
            className="mono font-bold mb-1 leading-none"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color }}
          >
            {value}
          </p>
          {sub && <p className="caption mt-1">{sub}</p>}
        </>
      )}
    </div>
  )
}