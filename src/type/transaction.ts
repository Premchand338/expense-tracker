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