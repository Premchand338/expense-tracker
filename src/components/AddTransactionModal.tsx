import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import type { Transaction } from '../type/transaction'
import { transactionSchema, type TransactionFormData, type TransactionFormInput } from '../schemas/transactionSchema'

const expenseCategories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other']
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']

interface Props {
  onSubmit: (data: TransactionFormData) => void
  onClose: () => void
  editingTransaction?: Transaction | null
}

export function AddTransactionModal({ onSubmit, onClose, editingTransaction }: Props) {
  const isEditing = !!editingTransaction

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TransactionFormInput, any, TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: editingTransaction
      ? {
          type: editingTransaction.type,
          amount: Math.abs(editingTransaction.amount),
          date: editingTransaction.date,
          category: editingTransaction.category,
          description: editingTransaction.description,
        }
      : { type: 'expense' },
  })

  const selectedType = watch('type')
  const categories = selectedType === 'income' ? incomeCategories : expenseCategories

  function handleFormSubmit(data: TransactionFormData) {
    const signedAmount = selectedType === 'expense' ? -Math.abs(data.amount) : Math.abs(data.amount)
    onSubmit({ ...data, amount: signedAmount })
    reset()
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      >
        <motion.form
          onSubmit={handleSubmit(handleFormSubmit)}
          onClick={(e) => e.stopPropagation()}
          className="app-card w-full max-w-md space-y-5 shadow-2xl relative"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <i className="fi fi-rr-cross-small"></i>
          </button>

          <div>
            <h2 className="text-lg font-bold text-gray-900">{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing ? 'Update the details below.' : 'Log a new income or expense.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                selectedType === 'expense'
                  ? 'border-rose-200 bg-rose-50 text-rose-700'
                  : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <input type="radio" value="expense" {...register('type')} className="sr-only" />
              <i className="fi fi-rr-arrow-trend-down"></i> Expense
            </label>
            <label
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                selectedType === 'income'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <input type="radio" value="income" {...register('type')} className="sr-only" />
              <i className="fi fi-rr-arrow-trend-up"></i> Income
            </label>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('amount')}
                className="form-input pl-7"
              />
            </div>
            {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Date</label>
            <input type="date" {...register('date')} className="form-input" />
            {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Category</label>
            <select {...register('category')} className="form-input">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Description</label>
            <input
              type="text"
              placeholder="e.g. Groceries, Salary, Rent"
              {...register('description')}
              className="form-input"
            />
            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
           
            <button type="submit" className="app-btn btn-primary">
              {isEditing ? 'Save changes' : 'Save transaction'}
            </button>
             {/* <button type="button" onClick={onClose} className="app-btn btn-secondary">
              Cancel
            </button> */}
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  )
}