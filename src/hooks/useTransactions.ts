// src/hooks/useTransactions.ts
import { useState, useEffect } from 'react'
import type { Transaction } from '../type/transaction.ts'
import { useToast } from '../context/ToastContext'

const STORAGE_KEY = 'finance-tracker-transactions'

export function useTransactions() {
  const { showToast } = useToast()
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
     try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch {
      showToast('Could not save — your browser storage may be full or disabled', 'error')
    }
  }, [transactions, showToast])
  
  function addTransaction(transaction: Omit<Transaction, 'id'>) {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  function editTransaction(id: string, updates: Partial<Transaction>) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  return { transactions, addTransaction, deleteTransaction, editTransaction }
}