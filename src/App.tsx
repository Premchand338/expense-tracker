import { useState } from 'react'
import type { View } from './type/view'
import { useTransactions } from './hooks/useTransactions'
import { AddTransactionModal } from './components/AddTransactionModal'
import { Dashboard } from './components/Dashboard'
import { TransactionsTable } from './components/TransactionsTable'
import { Budgets } from './components/Budget'
import { Goals } from './components/Goals'
import { LandingPage } from './components/LandingPage'
import { Sidebar } from './components/Sidebar'

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [activeView, setActiveView] = useState<View>('dashboard')

  if (!hasStarted) {
    return <LandingPage onGetStarted={() => setHasStarted(true)} />
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      <Sidebar active={activeView} onNavigate={setActiveView} onBackToHome={() => setHasStarted(false)} />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
        {activeView === 'dashboard' && <Dashboard transactions={transactions} />}

        {activeView === 'transactions' && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#2F5D4E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#264A3E] transition-colors"
              >
                + Add transaction
              </button>
            </div>
            <TransactionsTable transactions={transactions} onDelete={deleteTransaction} />
          </>
        )}

        {activeView === 'budgets-goals' && (
          <>
            <Budgets transactions={transactions} />
            <Goals />
          </>
        )}

        {isModalOpen && (
          <AddTransactionModal
            onSubmit={(data) => {
              addTransaction(data)
              setIsModalOpen(false)
            }}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </div>
  )
}

export default App