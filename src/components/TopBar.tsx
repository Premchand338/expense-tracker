import { useState } from 'react'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../context/LanguageContext'

interface Props {
  name: string
  onNameChange: (name: string) => void
  onAddTransaction: () => void
  availableMonths: string[]
  selectedMonth: string
  onMonthChange: (month: string) => void
}

export function TopBar({ name, onNameChange, onAddTransaction, availableMonths, selectedMonth, onMonthChange }: Props) {
  const { isDark, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [editValue, setEditValue] = useState(name)
  const today = format(new Date(), 'EEEE, dd MMM yyyy')

  function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return t('goodMorning')
    if (hour < 17) return t('goodAfternoon')
    return t('goodEvening')
  }

  function handleSaveName() {
    onNameChange(editValue.trim() || 'Friend')
    setIsProfileOpen(false)
  }

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div>
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {getGreeting()}, {name}! 👋
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t('overviewSubtitle')} {selectedMonth}.</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
          <i className="fi fi-rr-calendar text-gray-400"></i>
          {today}
        </span>

        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2F5D4E]/20 focus:border-[#2F5D4E]"
        >
          {availableMonths.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button
          onClick={onAddTransaction}
          className="bg-[#2F5D4E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#264A3E] transition-colors"
        >
          {t('addTransactionBtn')}
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? '🌙' : '☀️'}
        </button>

        <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {(['en', 'hi'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                lang === l ? 'bg-[#2F5D4E] text-white' : 'bg-white dark:bg-gray-800 dark:text-gray-300 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {l === 'en' ? 'EN' : 'HI'}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => { setEditValue(name); setIsProfileOpen((v) => !v) }}
            className="w-9 h-9 rounded-full bg-[#2F5D4E] text-white flex items-center justify-center text-sm font-semibold shrink-0 hover:bg-[#264A3E] transition-colors"
          >
            {name.charAt(0).toUpperCase()}
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <motion.div
                  className="absolute right-0 top-11 w-64 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl p-4 z-50"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">{t('yourName')}</label>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    autoFocus
                    className="form-input mb-3"
                  />
                  <button onClick={handleSaveName} className="app-btn btn-primary w-full">
                    {t('save')}
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