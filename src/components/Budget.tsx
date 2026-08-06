import { useState } from 'react'
import type { Transaction, ExpenseCategory } from '../type/transaction'
import { useBudgets } from '../hooks/useBudgets'

const expenseCategories: ExpenseCategory[] = [
  'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'
]

export function Budgets({ transactions }: { transactions: Transaction[] }) {
  const { budgets, setBudget } = useBudgets()
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
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-lg font-bold mb-4">Budgets</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <select value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)} className="border rounded px-3 py-2">
          {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="number"
          placeholder="Monthly limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Set budget</button>
      </form>

      <div className="space-y-3">
        {budgets.map((b) => {
          const spent = getSpent(b.category)
          const pct = Math.min((spent / b.limit) * 100, 100)
          const over = spent > b.limit
          return (
            <div key={b.id}>
              <div className="flex justify-between text-sm mb-1">
                <span>{b.category}</span>
                <span className={over ? 'text-red-600' : 'text-gray-600'}>
                  ₹{spent.toFixed(0)} / ₹{b.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className={`h-2 rounded ${over ? 'bg-red-600' : 'bg-green-600'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}