import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import { useState } from 'react'
import type { Transaction } from '../type/transaction'
import { getTotalBalance, getMonthlyIncome, getMonthlyExpense, getCategoryBreakdown } from '../utils/calculations'
import { groupByMonth } from '../utils/dateHelpers'
import { formatCurrency, CATEGORY_COLORS } from '../utils/format'

export function Dashboard({ transactions }: { transactions: Transaction[] }) {
  const balance = getTotalBalance(transactions)
  const income = getMonthlyIncome(transactions)
  const expense = getMonthlyExpense(transactions)
  const categoryData = getCategoryBreakdown(transactions)
  const monthlyData = groupByMonth(transactions)
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null)
  const formatTooltipValue = (value: unknown) => {
    if (value == null) return ''
    let v: number | string | undefined
    if (Array.isArray(value)) v = value[0] as any
    else v = value as any
    return v == null ? '' : `₹${formatCurrency(Number(v))}`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="app-card">
          <p className="text-sm font-medium text-gray-500">Total Balance</p>
          <p className={`text-3xl font-bold tracking-tight mt-1 tabular-nums ${balance < 0 ? 'text-red-600' : 'text-[#2F5D4E]'}`}>
            ₹{formatCurrency(balance)}
          </p>
        </div>
        <div className="app-card">
          <p className="text-sm font-medium text-gray-500">Monthly Income</p>
          <p className="text-3xl font-bold tracking-tight mt-1 tabular-nums text-green-600">₹{formatCurrency(income)}</p>
        </div>
        <div className="app-card">
          <p className="text-sm font-medium text-gray-500">Monthly Expenses</p>
          <p className="text-3xl font-bold tracking-tight mt-1 tabular-nums text-red-600">₹{formatCurrency(expense)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="app-card transition-transform duration-200 hover:scale-[1.01]">
          <p className="card-title">Income vs expenses</p>
          {monthlyData.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="w-full h-72 hover:shadow-md transition-shadow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <XAxis dataKey="month" fontSize={12} stroke="#9CA3AF" tickMargin={10} />
                  <YAxis fontSize={12} stroke="#9CA3AF" tickFormatter={(v) => formatCurrency(v)} />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <Bar dataKey="income" fill="#16A34A" name="Income" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#DC2626" name="Expense" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="app-card transition-transform duration-200 hover:scale-[1.01]">
          <p className="card-title">Spending by category</p>
          {categoryData.length === 0 ? (
            <p className="text-gray-400 text-sm">No expenses yet</p>
          ) : (
            <div className="w-full h-72 hover:shadow-md transition-shadow">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="category" outerRadius={90} label={({ payload }: any) => payload?.category}>
                    {categoryData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={CATEGORY_COLORS[d.category]?.chart ?? '#9CA3AF'}
                        stroke={hoveredPieIndex === i ? '#111827' : undefined}
                        strokeWidth={hoveredPieIndex === i ? 2 : 0}
                        cursor="pointer"
                        onMouseEnter={() => setHoveredPieIndex(i)}
                        onMouseLeave={() => setHoveredPieIndex(null)}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatTooltipValue} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}