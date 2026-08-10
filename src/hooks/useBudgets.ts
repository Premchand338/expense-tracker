import { useState, useEffect } from 'react'
import type { Budget, ExpenseCategory } from '../type/transaction'
import { useToast } from '../context/ToastContext'

const STORAGE_KEY = 'finance-tracker-budgets'

export function useBudgets() {
  const { showToast } = useToast()

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets))
    } catch {
      showToast('Could not save budget — your browser storage may be full or disabled', 'error')
    }
  }, [budgets, showToast])

  function setBudget(category: ExpenseCategory, limit: number) {
    setBudgets((prev) => {
      const existing = prev.find((b) => b.category === category)
      if (existing) {
        return prev.map((b) => (b.category === category ? { ...b, limit } : b))
      }
      return [...prev, { id: crypto.randomUUID(), category, limit }]
    })
  }

  function deleteBudget(id: string) {
    setBudgets((prev) => prev.filter((b) => b.id !== id))
  }

  return { budgets, setBudget, deleteBudget }
}