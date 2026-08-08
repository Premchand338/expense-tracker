

// Zod is a TypeScript-first validation library.
// this file defines how to validate user input before using it.
// Purpose of this File 
// This file validates data coming from a form.


// User ->  Form ->  Zod Validation(Security And data valid \ation before form submits) -> Database


import { z } from 'zod'

const expenseCategories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'] as const
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other'] as const


export const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  date: z.string().min(1, 'Date is required'),
  category: z.union([z.enum(expenseCategories), z.enum(incomeCategories)]),
  description: z.string().min(1, 'Description is required').max(100),
})


// Shape BEFORE Zod processes it — what the form fields actually hold
export type TransactionFormInput = z.input<typeof transactionSchema>

// Shape AFTER Zod validates/coerces — what handleSubmit's callback receives
export type TransactionFormData = z.output<typeof transactionSchema>