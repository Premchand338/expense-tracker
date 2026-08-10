import { motion, AnimatePresence } from 'framer-motion'
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

function SidebarContent({ active, onNavigate, onBackToHome, onClose, showCloseButton }: Omit<Props, 'isOpen'> & { showCloseButton: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between px-2 py-3 mb-4">
        <span className="text-white font-bold text-lg">Arth AI</span>
        {showCloseButton && (
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl">
            ✕
          </button>
        )}
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
    </>
  )
}

export function Sidebar({ active, onNavigate, onBackToHome, isOpen, onClose }: Props) {
  return (
    <>
      {/* Desktop — always visible, never animates, never unmounts */}
      <aside className="hidden md:flex w-60 bg-[#2F5D4E] flex-col p-4 min-h-screen">
        <SidebarContent
          active={active}
          onNavigate={onNavigate}
          onBackToHome={onBackToHome}
          onClose={onClose}
          showCloseButton={false}
        />
      </aside>

      {/* Mobile — animated drawer, only exists in the DOM while open */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed md:hidden top-0 left-0 h-screen w-60 bg-[#2F5D4E] flex flex-col p-4 z-40"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            >
              <SidebarContent
                active={active}
                onNavigate={onNavigate}
                onBackToHome={onBackToHome}
                onClose={onClose}
                showCloseButton={true}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}