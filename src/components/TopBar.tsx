import { useState } from 'react'
import { format } from 'date-fns'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

interface Props {
  name: string
  onAddTransaction: () => void
  availableMonths: string[]
  selectedMonth: string
  onMonthChange: (month: string) => void
}

export function TopBar({ name, onAddTransaction, availableMonths, selectedMonth, onMonthChange }: Props) {
  const [isDark, setIsDark] = useState(false)
  const [lang, setLang] = useState<'EN' | 'HI'>('EN')
  const today = format(new Date(), 'EEEE, dd MMM yyyy')

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div>
        <p className="text-xl font-bold text-gray-900">
          {getGreeting()}, {name}! 👋
        </p>
        <p className="text-sm text-gray-500 mt-0.5">Here's your finances overview for {selectedMonth}.</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
          <i className="fi fi-rr-calendar text-gray-400"></i>
          {today}
        </span>

        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2F5D4E]/20 focus:border-[#2F5D4E]"
        >
          {availableMonths.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button
          onClick={onAddTransaction}
          className="bg-[#2F5D4E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#264A3E] transition-colors"
        >
          + Add transaction
        </button>

        <button
          onClick={() => setIsDark((v) => !v)}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-sm hover:bg-gray-50 transition-colors"
        >
          {isDark ? '🌙' : '☀️'}
        </button>

        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          {(['EN', 'HI'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                lang === l ? 'bg-[#2F5D4E] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="w-9 h-9 rounded-full bg-[#2F5D4E] text-white flex items-center justify-center text-sm font-semibold shrink-0">
          {name.charAt(0)}
        </div>
      </div>
    </div>
  )
}