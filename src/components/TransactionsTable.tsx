import { useState } from 'react'
import type { Transaction } from '../type/transaction'
import { formatDate } from '../utils/dateHelpers'
import { formatCurrency, CATEGORY_COLORS } from '../utils/format'

interface Props {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export function TransactionsTable({ transactions, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all')

  const filtered = transactions
    .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => typeFilter === 'all' || t.type === typeFilter)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="app-card">
      <p className="card-title">Transactions</p>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input flex-1 min-w-45"
        />
        {(['all', 'income', 'expense'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`app-btn ${typeFilter === t ? 'btn-primary' : 'btn-secondary'} capitalize`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-gray-500">
          <thead>
            <tr className="text-left text-gray-600 bg-gray-50 border border-gray-500">
              <th className="py-3 pr-4 font-semibold">Date</th>
              <th className="py-3 pr-4 font-semibold">Description</th>
              <th className="py-3 pr-4 font-semibold">Category</th>
              <th className="py-3 pr-4 font-semibold text-right">Amount</th>
              <th className="py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-gray-500 last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 pr-4 whitespace-nowrap text-gray-600">{formatDate(t.date)}</td>
                <td className="py-3 pr-4 text-gray-900">{t.description}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      CATEGORY_COLORS[t.category]?.bg ?? 'bg-gray-50'
                    } ${CATEGORY_COLORS[t.category]?.text ?? 'text-gray-700'}`}
                  >
                    {t.category}
                  </span>
                </td>
                <td className={`py-3 pr-4 text-right font-semibold tabular-nums ${t.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {t.amount < 0 ? '-' : '+'}₹{formatCurrency(t.amount)}
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-gray-500 hover:text-red-600 text-xs font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">No transactions found</p>
        )}
      </div>
    </div>
  )
}