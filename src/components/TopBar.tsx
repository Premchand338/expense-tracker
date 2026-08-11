import { useState } from 'react'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

interface Props {
  name: string
  onNameChange: (name: string) => void
  onAddTransaction: () => void
  availableMonths: string[]
  selectedMonth: string
  onMonthChange: (month: string) => void
}

export function TopBar({ name, onNameChange, onAddTransaction, availableMonths, selectedMonth, onMonthChange }: Props) {
  const [isDark, setIsDark] = useState(false)
  const [lang, setLang] = useState<'EN' | 'HI'>('EN')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [editValue, setEditValue] = useState(name)
  const today = format(new Date(), 'EEEE, dd MMM yyyy')

  function handleSaveName() {
    onNameChange(editValue.trim() || 'Friend')
    setIsProfileOpen(false)
  }

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

        <div className="relative">
          <button
            onClick={() => {
              setEditValue(name)
              setIsProfileOpen((v) => !v)
            }}
            className="w-9 h-9 rounded-full bg-[#2F5D4E] text-white flex items-center justify-center text-sm font-semibold shrink-0 hover:bg-[#264A3E] transition-colors"
          >
            {name.charAt(0).toUpperCase()}
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <motion.div
                  className="absolute right-0 top-11 w-64 bg-white rounded-xl border border-gray-100 shadow-xl p-4 z-50"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Your name</label>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    autoFocus
                    className="form-input mb-3"
                  />
                  <button onClick={handleSaveName} className="app-btn btn-primary w-full">
                    Save
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}