export type TransactionType = 'income' | 'expense'

export type ExpenseCategory =
    | 'Food'
    | 'Rent'
    | 'Transport'
    | 'Entertainment'
    | 'Shopping'
    | 'Bills'
    | 'Health'
    | 'Other'

export type IncomeCategory =
    | 'Salary'
    | 'Freelance'
    | 'Investment'
    | 'Other'

export interface Transaction {
    id: string
    amount: number
    date: string
    type: TransactionType
    category: ExpenseCategory | IncomeCategory
    description: string
}

export interface Budget {
  id: string
  category: ExpenseCategory
  limit: number
}

export interface Goal {
  id: string
  title: string
  targetAmount: number
  savedAmount: number
  targetDate: string
}