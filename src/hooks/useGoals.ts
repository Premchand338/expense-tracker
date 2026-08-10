import { useState, useEffect } from 'react'
import type { Goal } from '../type/transaction'
import { useToast } from '../context/ToastContext'

const STORAGE_KEY = 'finance-tracker-goals'

export function useGoals() {
  const { showToast } = useToast()

  const [goals, setGoals] = useState<Goal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
    } catch {
      showToast('Could not save goal — your browser storage may be full or disabled', 'error')
    }
  }, [goals, showToast])

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