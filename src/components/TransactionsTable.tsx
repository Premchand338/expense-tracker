import { useState } from 'react'
import type { Transaction } from '../type/transaction'
import { formatDate } from '../utils/dateHelpers'

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
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1 min-w-[180px]"
        />
        {(['all', 'income', 'expense'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-2 rounded border capitalize ${
              typeFilter === t ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Description</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4 text-right">Amount</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b last:border-0">
                <td className="py-2 pr-4 whitespace-nowrap">{formatDate(t.date)}</td>
                <td className="py-2 pr-4">{t.description}</td>
                <td className="py-2 pr-4">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{t.category}</span>
                </td>
                <td className={`py-2 pr-4 text-right font-medium ${t.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {t.amount < 0 ? '-' : '+'}₹{Math.abs(t.amount).toFixed(2)}
                </td>
                <td className="py-2 text-right">
                  <button onClick={() => onDelete(t.id)} className="text-gray-400 hover:text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-6">No transactions found</p>
        )}
      </div>
    </div>
  )
}