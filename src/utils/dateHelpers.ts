import { format, parseISO } from 'date-fns'

export function formatDate(dateString: string) {
  return format(parseISO(dateString), 'dd MMM yyyy')
}

export function groupByMonth(transactions: { date: string; type: string; amount: number }[]) {
  const groups: Record<string, { income: number; expense: number }> = {}

  for (const t of transactions) {
    const monthKey = format(parseISO(t.date), 'MMM yyyy')
    if (!groups[monthKey]) groups[monthKey] = { income: 0, expense: 0 }
    if (t.type === 'income') groups[monthKey].income += t.amount
    else groups[monthKey].expense += Math.abs(t.amount)
  }

  return Object.entries(groups)
    .map(([month, values]) => ({ month, ...values }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
}

export function getMonthKey(dateString: string) {
  return format(parseISO(dateString), 'MMM yyyy')
}

export function filterByMonth<T extends { date: string }>(transactions: T[], monthKey: string): T[] {
  return transactions.filter((t) => getMonthKey(t.date) === monthKey)
}

export function getAvailableMonths(transactions: { date: string }[]) {
  const current = format(new Date(), 'MMM yyyy')
  const monthsSet = new Set(transactions.map((t) => getMonthKey(t.date)))
  monthsSet.add(current)
  return Array.from(monthsSet).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
}