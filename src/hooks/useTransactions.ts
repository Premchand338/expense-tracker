// src/hooks/useTransactions.ts
import { useState, useEffect } from 'react'
import type { Transaction } from '../type/transaction.ts'

const STORAGE_KEY = 'finance-tracker-transactions'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

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