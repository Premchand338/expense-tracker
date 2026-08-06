import { useState, useEffect } from 'react'
import type { Goal } from '../type/transaction'

const STORAGE_KEY = 'finance-tracker-goals'

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
  }, [goals])

  function addGoal(goal: Omit<Goal, 'id' | 'savedAmount'>) {
    setGoals((prev) => [...prev, { ...goal, id: crypto.randomUUID(), savedAmount: 0 }])
  }

  function addToGoal(id: string, amount: number) {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, savedAmount: g.savedAmount + amount } : g))
    )
  }

  function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  return { goals, addGoal, addToGoal, deleteGoal }
}