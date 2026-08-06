// src/App.tsx
import { useState } from 'react'
import { useTransactions } from './hooks/useTransactions'
import { AddTransactionModal } from './components/AddTransactionModal'
import { Dashboard } from './components/Dashboard'
import { TransactionsTable } from './components/TransactionsTable'
import { Budgets } from './components/Budget'
import { Goals } from './components/Goals'

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Dashboard transactions={transactions} />

      <div className="flex items-center justify-between mt-6 mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add transaction
        </button>
      </div>

      {isModalOpen && (
        <AddTransactionModal
          onSubmit={(data) => {
            addTransaction({
              type: data.type,
              amount: data.amount,
              date: data.date,
              category: data.category as any,
              description: data.description
            })
            setIsModalOpen(false)
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <TransactionsTable transactions={transactions} onDelete={deleteTransaction} />

      <Budgets transactions={transactions} />
      <Goals />
    </div>
  )
}

export default App