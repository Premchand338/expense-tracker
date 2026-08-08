import { useState } from 'react'
import { useGoals } from '../hooks/useGoals'

export function Goals() {
  const { goals, addGoal, addToGoal, deleteGoal } = useGoals()
  const [title, setTitle] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [targetDate, setTargetDate] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !targetAmount || !targetDate) return
    addGoal({ title, targetAmount: Number(targetAmount), targetDate })
    setTitle('')
    setTargetAmount('')
    setTargetDate('')
  }

  return (
    <div className="app-card">
      <h2 className="card-title">Goals</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <input type="text" placeholder="Goal title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input flex-1" style={{ minWidth: 140 }} />
        <input type="number" placeholder="Target amount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="form-input w-36" />
        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="form-input" />
        <button type="submit" className="app-btn btn-primary">
          Add goal
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((g) => {
          const pct = Math.min((g.savedAmount / g.targetAmount) * 100, 100)
          const complete = g.savedAmount >= g.targetAmount
          return (
            <div key={g.id} className="app-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold">{g.title}</p>
                  <p className="text-xs text-gray-500">Target: {g.targetDate}</p>
                </div>
                <button onClick={() => deleteGoal(g.id)} className="text-gray-400 hover:text-red-600 text-sm font-medium">Delete</button>
              </div>
              <p className="text-xl font-bold mb-1">
                ₹{g.savedAmount.toFixed(0)} <span className="text-sm text-gray-500 font-normal">of ₹{g.targetAmount}</span>
              </p>
              <div className="w-full bg-gray-200 rounded h-2 mb-2">
                <div className={`h-2 rounded ${complete ? 'bg-orange-500' : 'bg-green-600'}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-xs ${complete ? 'text-orange-600' : 'text-gray-500'}`}>
                  {complete ? 'Completed' : `${pct.toFixed(0)}%`}
                </span>
                {!complete && (
                  <button
                    onClick={() => {
                      const amt = prompt('Add amount to this goal:')
                      if (amt && !isNaN(Number(amt))) addToGoal(g.id, Number(amt))
                    }}
                    className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    + Add funds
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}