
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
}



export const CATEGORY_COLORS: Record<string, { bg: string; text: string; chart: string; icon: string }> = {
  Food: { bg: 'bg-amber-50', text: 'text-amber-700', chart: '#D9A441', icon: 'fi-rr-utensils' },
  Rent: { bg: 'bg-slate-50', text: 'text-slate-700', chart: '#64748B', icon: 'fi-rr-home' },
  Transport: { bg: 'bg-blue-50', text: 'text-blue-700', chart: '#3B82C4', icon: 'fi-rr-bus' },
  Entertainment: { bg: 'bg-pink-50', text: 'text-pink-700', chart: '#D4537E', icon: 'fi-rr-play' },
  Shopping: { bg: 'bg-purple-50', text: 'text-purple-700', chart: '#7C6FE0', icon: 'fi-rr-shopping-bag' },
  Bills: { bg: 'bg-orange-50', text: 'text-orange-700', chart: '#D85A30', icon: 'fi-rr-receipt' },
  Health: { bg: 'bg-teal-50', text: 'text-teal-700', chart: '#1D9E88', icon: 'fi-rr-heart' },
  Other: { bg: 'bg-gray-50', text: 'text-gray-700', chart: '#9CA3AF', icon: 'fi-rr-ellipsis-h' },
  Salary: { bg: 'bg-green-50', text: 'text-green-700', chart: '#16A34A', icon: 'fi-rr-briefcase' },
  Freelance: { bg: 'bg-green-50', text: 'text-green-700', chart: '#22A05A', icon: 'fi-rr-laptop' },
  Investment: { bg: 'bg-green-50', text: 'text-green-700', chart: '#2E9E6E', icon: 'fi-rr-chart-line-up' },
}