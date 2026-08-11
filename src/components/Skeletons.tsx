function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-gray-200/70 ${className}`} />
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Pulse className="h-32" />
        <Pulse className="h-32" />
        <Pulse className="h-32 sm:col-span-2 xl:col-span-1" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Pulse className="h-80" />
        <Pulse className="h-80" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Pulse className="h-64" />
        <Pulse className="h-64" />
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="app-card space-y-4">
      <Pulse className="h-11 w-full" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Pulse key={i} className="h-14 w-full" />
        ))}
      </div>
    </div>
  )
}

export function BudgetsGoalsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Pulse className="h-80" />
      <Pulse className="h-80" />
    </div>
  )
}