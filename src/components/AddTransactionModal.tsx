import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionSchema, type TransactionFormData } from '../schemas/transactionSchema'

const expenseCategories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other']
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']

interface Props {
  onSubmit: (data: TransactionFormData) => void
  onClose: () => void
}

export function AddTransactionModal({ onSubmit, onClose }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema) as any,
    defaultValues: { type: 'expense' },
  })

  const selectedType = watch('type')
  const categories = selectedType === 'income' ? incomeCategories : expenseCategories

  function handleFormSubmit(data: TransactionFormData) {
    const signedAmount = selectedType === 'expense' ? -Math.abs(data.amount) : Math.abs(data.amount)
    onSubmit({ ...data, amount: signedAmount })
    console.log(signedAmount);
    
    reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="app-card w-full max-w-md space-y-4 shadow-xl"
      >
        <h2 className="text-lg font-bold">Add Transaction</h2>

        <div className="flex gap-2">
          <label className="flex-1 inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" value="expense" {...register('type')} /> Expense
          </label>
          <label className="flex-1 inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" value="income" {...register('type')} /> Income
          </label>
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            {...register('amount')}
            className="form-input"
          />
          {errors.amount && <p className="text-red-600 text-sm">{errors.amount.message}</p>}
        </div>

        <div>
          <input type="date" {...register('date')} className="form-input" />
          {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
        </div>

        <div>
          <select {...register('category')} className="form-input">
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Description"
            {...register('description')}
            className="form-input"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="app-btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="app-btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}