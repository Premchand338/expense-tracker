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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-lg font-bold">Add Transaction</h2>

        <div className="flex gap-2">
          <label className="flex-1">
            <input type="radio" value="expense" {...register('type')} /> Expense
          </label>
          <label className="flex-1">
            <input type="radio" value="income" {...register('type')} /> Income
          </label>
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            {...register('amount')}
            className="w-full border rounded p-2"
          />
          {errors.amount && <p className="text-red-600 text-sm">{errors.amount.message}</p>}
        </div>

        <div>
          <input type="date" {...register('date')} className="w-full border rounded p-2" />
          {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
        </div>

        <div>
          <select {...register('category')} className="w-full border rounded p-2">
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
            className="w-full border rounded p-2"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}