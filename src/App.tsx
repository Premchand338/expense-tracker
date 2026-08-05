// src/App.tsx
import { useTransactions } from './hooks/useTransactions'

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions()

  function handleTestAdd() {
    addTransaction({
      amount: -450,
      date: '2026-08-05',
      type: 'expense',
      category: 'Food',
      description: 'Groceries',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Finance Tracker</h1>

      <button
        onClick={handleTestAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add test transaction
      </button>

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="flex justify-between bg-white p-3 rounded shadow">
            <span>{t.description} — {t.category}</span>
            <span className={t.amount < 0 ? 'text-red-600' : 'text-green-600'}>
              ₹{t.amount}
            </span>
            <button onClick={() => deleteTransaction(t.id)} className="text-sm text-gray-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App