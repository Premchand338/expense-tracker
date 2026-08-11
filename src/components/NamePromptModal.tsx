import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onSubmit: (name: string) => void
  onSkip: () => void
}

export function NamePromptModal({ onSubmit, onSkip }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(value.trim() || 'Friend')
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="app-card w-full max-w-sm space-y-4 shadow-2xl text-center"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <span className="w-12 h-12 rounded-xl bg-[#2F5D4E]/10 text-[#2F5D4E] flex items-center justify-center text-xl mx-auto">
            👋
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">What should we call you?</h2>
            <p className="text-sm text-gray-500 mt-1">We'll use this to personalize your dashboard.</p>
          </div>

          <input
            type="text"
            autoFocus
            placeholder="Your name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-input text-center"
          />

          <div className="flex gap-2">
            <button type="button" onClick={onSkip} className="app-btn btn-secondary flex-1">
              Skip
            </button>
            <button type="submit" className="app-btn btn-primary flex-1">
              Continue →
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  )
}