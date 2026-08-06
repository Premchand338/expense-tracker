
import type { Transaction } from '../type/transaction.ts'

export function getTotalBalance(transactions: Transaction[]) {
  return transactions.reduce((sum, t) => sum + t.amount, 0)
}

export function getMonthlyIncome(transactions: Transaction[]) {
  return transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
}

export function getMonthlyExpense(transactions: Transaction[]) {
  return Math.abs(
    transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  )
}

export function getCategoryBreakdown(transactions: Transaction[]) {
  const expenseOnly = transactions.filter((t) => t.type === 'expense')
  const byCategory: Record<string, number> = {}
  for (const t of expenseOnly) {
    byCategory[t.category] = (byCategory[t.category] || 0) + Math.abs(t.amount)
  }
  return Object.entries(byCategory).map(([category, value]) => ({ category, value }))
}