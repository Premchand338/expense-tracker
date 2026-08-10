import { useState } from 'react'
import { useGoals } from '../hooks/useGoals'
import { formatCurrency } from '../utils/format'
import { formatDate } from '../utils/dateHelpers'
import { useToast } from '../context/ToastContext'

export function Goals() {
  const { goals, addGoal, addToGoal, deleteGoal } = useGoals()
  const [title, setTitle] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [targetDate, setTargetDate] = useState('')
const { showToast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !targetAmount || !targetDate) return
    addGoal({ title, targetAmount: Number(targetAmount), targetDate })
    setTitle('')
    setTargetAmount('')
    setTargetDate('')
    showToast('Goal added')
  }

  return (
    <div className="app-card">
      <p className="card-title mb-1">Goals</p>
      <p className="text-sm text-gray-500 mb-5">Set a savings target and track your progress.</p>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input flex-1 min-w-35 border-2 border-gray-200 focus:border-[#2F5D4E] focus:ring-1 focus:ring-[#2F5D4E]"
        />
        <input
          type="number"
          placeholder="Target amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="form-input w-36 border-2 border-gray-200 focus:border-[#2F5D4E] focus:ring-1 focus:ring-[#2F5D4E]"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="form-input border-2 border-gray-200 focus:border-[#2F5D4E] focus:ring-1 focus:ring-[#2F5D4E]"
        />
        <button type="submit" className="app-btn btn-primary">
          Set Goal
        </button>
      </form>

      {goals.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No goals yet — add one above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {goals.map((g) => {
            const pct = Math.min((g.savedAmount / g.targetAmount) * 100, 100)
            const complete = g.savedAmount >= g.targetAmount
            return (
              <div key={g.id} className="rounded-2xl border-2 border-blue-200 p-4 group hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{g.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Target: {formatDate(g.targetDate)}</p>
                  </div>
                  <button
                    onClick={() => {
                      deleteGoal(g.id)
                      showToast('Goal removed', 'error')
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 group-hover:opacity-100 shrink-0"
                    aria-label={`Delete ${g.title} goal`}
                  >
                    <i className="fi fi-rr-trash text-sm"></i>
                    Delete
                  </button>
                </div>

                <p className="text-2xl font-bold tracking-tight tabular-nums text-gray-900 mb-2">
                  ₹{formatCurrency(g.savedAmount)}
                  <span className="text-sm text-gray-400 font-normal"> of ₹{formatCurrency(g.targetAmount)}</span>
                </p>

                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all ${complete ? 'bg-orange-500' : 'bg-[#2F5D4E]'}`}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${complete ? 'text-orange-600' : 'text-gray-500'}`}>
                    {complete ? '✓ Completed' : `${pct.toFixed(0)}%`}
                  </span>
                  {!complete && (
                    <button
                      onClick={() => {
                        const amt = prompt('Add amount to this goal:')
                        if (amt && !isNaN(Number(amt))) addToGoal(g.id, Number(amt))
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F5D4E] hover:text-[#264A3E] transition-colors"
                    >
                      <i className="fi fi-rr-plus text-xs"></i>
                      Add funds
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}