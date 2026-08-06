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