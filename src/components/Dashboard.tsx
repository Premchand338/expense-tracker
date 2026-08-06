import type { Transaction } from '../type/transaction'
import { getTotalBalance, getMonthlyIncome, getMonthlyExpense, getCategoryBreakdown } from '../utils/calculations'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import { groupByMonth } from '../utils/dateHelpers'

const COLORS = ['#16a34a', '#dc2626', '#2563eb', '#d97706', '#7c3aed', '#0891b2', '#db2777', '#65a30d']

export function Dashboard({ transactions }: { transactions: Transaction[] }) {
  const monthlyData = groupByMonth(transactions)
  const balance = getTotalBalance(transactions)
  const income = getMonthlyIncome(transactions)
  const expense = getMonthlyExpense(transactions)
  const categoryData = getCategoryBreakdown(transactions)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className={`text-2xl font-bold ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ₹{balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500">Monthly Income</p>
          <p className="text-2xl font-bold text-green-600">₹{income.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500">Monthly Expenses</p>
          <p className="text-2xl font-bold text-red-600">₹{expense.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <p className="font-bold mb-2">Spending by Category</p>
        {categoryData.length === 0 ? (
          <p className="text-gray-400 text-sm">No expenses yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="category" outerRadius={90} label>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="bg-white rounded-lg p-4 shadow mb-6">
  <p className="font-bold mb-2">Income vs Expenses</p>
  {monthlyData.length === 0 ? (
    <p className="text-gray-400 text-sm">No data yet</p>
  ) : (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={monthlyData}>
        <XAxis dataKey="month" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#16a34a" name="Income" />
        <Bar dataKey="expense" fill="#dc2626" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  )}
</div>
    </div>
  )
}