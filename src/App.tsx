import { useState } from "react";
import type { View } from "./type/view";
import { useTransactions } from "./hooks/useTransactions";
import { AddTransactionModal } from "./components/AddTransactionModal";
import { Dashboard } from "./components/Dashboard";
import { TransactionsTable } from "./components/TransactionsTable";
import { Budgets } from "./components/Budget";
import { Goals } from "./components/Goals";
import { LandingPage } from "./components/LandingPage";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from './components/Topbar'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeView, setActiveView] = useState<View>("dashboard");

  if (!hasStarted) {
    return <LandingPage onGetStarted={() => setHasStarted(true)} />;
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

        <div className="max-w-5xl mx-auto w-full space-y-6">
  <TopBar name="Premchand" onAddTransaction={() => setIsModalOpen(true)} />

  {activeView === 'dashboard' && <Dashboard transactions={transactions} />}

  {activeView === 'transactions' && (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      <TransactionsTable transactions={transactions} onDelete={deleteTransaction} />
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
            onSubmit={(data) => {
              addTransaction(data);
              setIsModalOpen(false);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
