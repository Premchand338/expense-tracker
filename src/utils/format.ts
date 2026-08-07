export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; chart: string }> = {
  Food: { bg: 'bg-amber-50', text: 'text-amber-700', chart: '#D9A441' },
  Rent: { bg: 'bg-slate-50', text: 'text-slate-700', chart: '#64748B' },
  Transport: { bg: 'bg-blue-50', text: 'text-blue-700', chart: '#3B82C4' },
  Entertainment: { bg: 'bg-pink-50', text: 'text-pink-700', chart: '#D4537E' },
  Shopping: { bg: 'bg-purple-50', text: 'text-purple-700', chart: '#7C6FE0' },
  Bills: { bg: 'bg-orange-50', text: 'text-orange-700', chart: '#D85A30' },
  Health: { bg: 'bg-teal-50', text: 'text-teal-700', chart: '#1D9E88' },
  Other: { bg: 'bg-gray-50', text: 'text-gray-700', chart: '#9CA3AF' },
  Salary: { bg: 'bg-green-50', text: 'text-green-700', chart: '#16A34A' },
  Freelance: { bg: 'bg-green-50', text: 'text-green-700', chart: '#22A05A' },
  Investment: { bg: 'bg-green-50', text: 'text-green-700', chart: '#2E9E6E' },
}