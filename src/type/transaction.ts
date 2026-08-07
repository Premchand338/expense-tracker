export type TransactionType = 'income' | 'expense'  

// Literal Type 
// type = "income" ✅
// type = "expense" ✅
// type = "earning" ❌
// type = "money" ❌

export type ExpenseCategory =    // This is also a Literal Type. -> category = "Pizza" ❌  category = "Food" ✅
    | 'Food'
    | 'Rent'
    | 'Transport'
    | 'Entertainment'
    | 'Shopping'
    | 'Bills'
    | 'Health'
    | 'Other'

export type IncomeCategory =    // This is also a Literal Type. -> category = "Found Pocket" ❌  category = "Other" ✅
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