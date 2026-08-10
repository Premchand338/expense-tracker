import { useState } from 'react'
import type { Transaction, ExpenseCategory } from '../type/transaction'
import { useBudgets } from '../hooks/useBudgets'
import { formatCurrency, CATEGORY_COLORS } from '../utils/format'
import { useToast } from '../context/ToastContext'

const expenseCategories: ExpenseCategory[] = [
  'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'
]

export function Budgets({ transactions }: { transactions: Transaction[] }) {
  const { budgets, setBudget, deleteBudget } = useBudgets()
  const [category, setCategory] = useState<ExpenseCategory>('Food')
  const [limit, setLimit] = useState('')
  const{ showToast } = useToast()

  function getSpent(cat: ExpenseCategory) {
    return Math.abs(
      transactions
        .filter((t) => t.type === 'expense' && t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0)
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!limit) return
    setBudget(category, Number(limit))
    setLimit('')
    showToast('Budget Added')
  }

  return (
    <div className="app-card">
      <p className="card-title mb-1">Budgets</p>
      <p className="text-sm text-gray-500 mb-5">Set a monthly limit per category and track it live.</p>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-100">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          className="form-input flex-1 min-w-35  border-2 border-gray-200 focus:border-[#2F5D4E] focus:ring-1 focus:ring-[#2F5D4E]"
        >
          {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="number"
          placeholder="Monthly limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="form-input w-36  border-2 border-gray-200 focus:border-[#2F5D4E] focus:ring-1 focus:ring-[#2F5D4E]"
        />
        <button type="submit" className="app-btn btn-primary">
          Set budget
        </button>
      </form>

      {budgets.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No budgets set yet — add one above.</p>
      ) : (
        <div className="space-y-5">
          {budgets.map((b) => {
            const spent = getSpent(b.category)
            const pct = Math.min((spent / b.limit) * 100, 100)
            const over = spent > b.limit
            const colors = CATEGORY_COLORS[b.category]
            return (
              <div key={b.id} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${colors?.bg ?? 'bg-slate-100'} ${colors?.text ?? 'text-slate-700'}`}>
                    <span className="h-2.5 w-2.5 rounded-full bg-current opacity-40" />
                    {b.category}
                  </span>

                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium tabular-nums ${over ? 'text-red-600' : 'text-gray-600'}`}>
                      ₹{formatCurrency(spent)} <span className="text-gray-400 font-normal">/ ₹{formatCurrency(b.limit)}</span>
                    </span>
                    <button
                      onClick={() => {
                        deleteBudget(b.id)
                        showToast('Budget removed', 'error')
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${over ? 'bg-red-600' : 'bg-[#2F5D4E]'}`}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}