import type { View } from '../type/view'

interface Props {
  active: View
  onNavigate: (view: View) => void
  onBackToHome: () => void
  isOpen: boolean
  onClose: () => void
}

const navItems: { id: View; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'transactions', label: 'Transactions', icon: '☰' },
  { id: 'budgets-goals', label: 'Budgets & Goals', icon: '◔' },
]

export function Sidebar({ active, onNavigate, onBackToHome, isOpen, onClose }: Props) {
  return (
    <>
      {/* Overlay — only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto md:min-h-screen w-60 bg-[#2F5D4E] flex flex-col p-4 z-40 transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-2 py-3 mb-4">
          <span className="text-white font-bold text-lg">Arth AI</span>
          <button onClick={onClose} className="text-white/70 hover:text-white md:hidden text-xl">
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                onClose()
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onBackToHome}
          className="text-white/60 hover:text-white text-sm font-medium px-3 py-2.5 text-left transition-colors"
        >
          ← Back to home
        </button>
      </aside>
    </>
  )
}