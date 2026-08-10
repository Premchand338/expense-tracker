import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { View } from "./type/view";
import type { Transaction } from "./type/transaction";
import { useTransactions } from "./hooks/useTransactions";
import { getAvailableMonths } from "./utils/dateHelpers";
import { AddTransactionModal } from "./components/AddTransactionModal";
import { Dashboard } from "./components/Dashboard";
import { TransactionsTable } from "./components/TransactionsTable";
import { Budgets } from "./components/Budget";
import { Goals } from "./components/Goals";
import { LandingPage } from "./components/LandingPage";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from './components/TopBar'
import { useToast } from './context/ToastContext'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { transactions, addTransaction, editTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(() => {
    return localStorage.getItem('finance-tracker-has-started') === 'true'
  });
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(() => format(new Date(), 'MMM yyyy'));

  const availableMonths = getAvailableMonths(transactions);
  const { showToast } = useToast()

  useEffect(() => {
    localStorage.setItem('finance-tracker-has-started', String(hasStarted))
  }, [hasStarted]);

  if (!hasStarted) {
    return <LandingPage onGetStarted={() => setHasStarted(true)} />;
  }

  function handleModalSubmit(data: Omit<Transaction, 'id'>) {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, data)
      showToast('Transaction updated')
    } else {
      addTransaction(data)
      showToast('Transaction added')
    }
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingTransaction(null);
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      <Sidebar
        active={activeView}
        onNavigate={setActiveView}
        onBackToHome={() => setHasStarted(false)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 p-6 space-y-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden mb-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
        >
          ☰ Menu
        </button>

        <div className="max-w-7xl mx-auto w-full space-y-6">
          <TopBar
            name="Premchand"
            onAddTransaction={() => {
              setEditingTransaction(null);
              setIsModalOpen(true);
            }}
            availableMonths={availableMonths}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          {activeView === 'dashboard' && (
            <Dashboard transactions={transactions} selectedMonth={selectedMonth} />
          )}

          {activeView === 'transactions' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
              <TransactionsTable
                transactions={transactions}
                onDelete={deleteTransaction}
                onEdit={(t) => {
                  setEditingTransaction(t);
                  setIsModalOpen(true);
                }}
              />
            </>
          )}

          {activeView === 'budgets-goals' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <Budgets transactions={transactions} />
              <Goals />
            </div>
          )}
        </div>

        {isModalOpen && (
          <AddTransactionModal
            onSubmit={handleModalSubmit}
            onClose={handleCloseModal}
            editingTransaction={editingTransaction}
            key={editingTransaction?.id ?? 'new'}
          />
        )}
      </main>
    </div>
  );
}

export default App;