import { useState } from 'react'
import type { Transaction, ExpenseCategory } from '../type/transaction'
import { useBudgets } from '../hooks/useBudgets'
import { formatCurrency, CATEGORY_COLORS } from '../utils/format'

const expenseCategories: ExpenseCategory[] = [
  'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'
]

export function Budgets({ transactions }: { transactions: Transaction[] }) {
  const { budgets, setBudget, deleteBudget } = useBudgets()
  const [category, setCategory] = useState<ExpenseCategory>('Food')
  const [limit, setLimit] = useState('')

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
  }

  return (
    <div className="app-card">
      <p className="card-title">Budgets</p>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-5 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          className="form-input"
        >
          {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="number"
          placeholder="Monthly limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="form-input w-40"
        />
        <button
          type="submit"
          className="app-btn btn-primary"
        >
          Set budget
        </button>
      </form>

      {budgets.length === 0 ? (
        <p className="text-gray-400 text-sm">No budgets set yet</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((b) => {
            const spent = getSpent(b.category)
            const pct = Math.min((spent / b.limit) * 100, 100)
            const over = spent > b.limit
            const colors = CATEGORY_COLORS[b.category]
            return (
              <div key={b.id} className="hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center text-sm mb-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors?.bg} ${colors?.text}`}>
                    {b.category}
                  </span>
                  <span className={`font-medium tabular-nums ${over ? 'text-red-600' : 'text-gray-600'}`}>
                    ₹{formatCurrency(spent)} <span className="text-gray-400 font-normal">/ ₹{formatCurrency(b.limit)}</span>
                  </span>
                  <button
        onClick={() => deleteBudget(b.id)}
        className="text-gray-300 hover:text-red-600 text-xs font-medium transition-colors"
      >
        Delete
      </button>
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