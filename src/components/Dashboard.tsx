import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { useState } from 'react'
import type { Transaction } from '../type/transaction'
import { getTotalBalance, getMonthlyIncome, getMonthlyExpense, getCategoryBreakdown, getRecentTransactions } from '../utils/calculations'
import { groupByMonth, filterByMonth, formatDate } from '../utils/dateHelpers'
import { formatCurrency, CATEGORY_COLORS } from '../utils/format'

export function Dashboard({ transactions, selectedMonth }: { transactions: Transaction[]; selectedMonth: string }) {
    //  throw new Error('test crash')
  const monthTransactions = filterByMonth(transactions, selectedMonth)

  const balance = getTotalBalance(monthTransactions)
  const income = getMonthlyIncome(monthTransactions)
  const expense = getMonthlyExpense(monthTransactions)
  const categoryData = getCategoryBreakdown(monthTransactions)
  const monthlyData = groupByMonth(transactions) // full trend — intentionally NOT filtered
  const savings = income - expense

  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null)
  const [recentView, setRecentView] = useState<'month' | 'all'>('month')
  const recentTransactions = getRecentTransactions(recentView === 'month' ? monthTransactions : transactions, 5)

  const totalSpending = categoryData.reduce((sum, d) => sum + d.value, 0)

  const formatTooltipValue = (value: unknown) => {
    if (value == null) return ''
    let v: number | string | undefined
    if (Array.isArray(value)) v = value[0] as any
    else v = value as any
    return v == null ? '' : `₹${formatCurrency(Number(v))}`
  }

  const balanceTone = balance < 0 ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
  const balanceBadge = balance < 0 ? 'Needs attention' : 'Healthy'

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="app-card relative overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Total balance · {selectedMonth}</p>
              <p className={`mt-3 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl ${balance < 0 ? 'text-red-600' : 'text-[#2F5D4E]'}`}>
                ₹{formatCurrency(balance)}
              </p>
            </div>
            <div className={`max-w-full rounded-2xl px-3 py-2 text-[clamp(0.72rem,1.4vw,0.88rem)] font-semibold leading-tight wrap-break-word ${balanceTone}`}>
              {balanceBadge}
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-600">Net position for the selected month.</p>
        </div>

        <div className="app-card relative overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Income · {selectedMonth}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums text-emerald-600 sm:text-4xl">₹{formatCurrency(income)}</p>
            </div>
            <div className="max-w-full rounded-2xl bg-emerald-50 px-3 py-2 text-[clamp(0.72rem,1.4vw,0.88rem)] font-semibold leading-tight text-emerald-700">Steady inflow</div>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-600">Money received in the selected month.</p>
        </div>

        <div className="app-card relative overflow-hidden sm:col-span-2 xl:col-span-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Expenses · {selectedMonth}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums text-rose-600 sm:text-4xl">₹{formatCurrency(expense)}</p>
            </div>
            <div className="max-w-full rounded-2xl bg-rose-50 px-3 py-2 text-[clamp(0.72rem,1.4vw,0.88rem)] font-semibold leading-tight text-rose-700">This month</div>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-600">Spending in the selected month.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="app-card">
          <div className="mb-4 flex items-center justify-between">
            <p className="card-title">Recent transactions</p>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden text-xs">
              <button
                onClick={() => setRecentView('month')}
                className={`px-2.5 py-1.5 font-medium transition-colors ${recentView === 'month' ? 'bg-[#2F5D4E] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                This month
              </button>
              <button
                onClick={() => setRecentView('all')}
                className={`px-2.5 py-1.5 font-medium transition-colors ${recentView === 'all' ? 'bg-[#2F5D4E] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                All time
              </button>
            </div>
          </div>
          {recentTransactions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((t) => {
                const colors = CATEGORY_COLORS[t.category]
                return (
                  <div key={t.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors?.bg ?? 'bg-gray-50'} ${colors?.text ?? 'text-gray-600'}`}>
                        <i className={`fi ${colors?.icon ?? 'fi-rr-circle'}`}></i>
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{t.description}</p>
                        <p className="text-xs text-gray-400">{formatDate(t.date)}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold tabular-nums shrink-0 ${t.amount < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {t.amount < 0 ? '-' : '+'}₹{formatCurrency(t.amount)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="app-card">
          <p className="card-title mb-4">Monthly summary · {selectedMonth}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total income</span>
              <span className="text-sm font-semibold tabular-nums text-gray-900">₹{formatCurrency(income)}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total expenses</span>
              <span className="text-sm font-semibold tabular-nums text-gray-900">₹{formatCurrency(expense)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-3 mt-2">
              <span className="text-sm font-semibold text-emerald-800">Savings</span>
              <span className={`text-sm font-bold tabular-nums ${savings < 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                ₹{formatCurrency(savings)}
              </span>
            </div>
          </div>
        </div>
        <div className="app-card transition-transform duration-200 hover:-translate-y-0.5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {/* <p className="card-title mb-1">Income vs expenses</p> */}
              <p className="text-sm text-gray-500">{selectedMonth} highlighted against recent months.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Income
              <span className="ml-2 h-2.5 w-2.5 rounded-full bg-rose-500" /> Expenses
            </div>
          </div>
          {monthlyData.length === 0 ? (
            <p className="text-sm text-gray-400">No data yet</p>
          ) : (
            <div className="h-72 w-full rounded-2xl bg-linear-to-br from-slate-50 to-white p-2 sm:p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <XAxis dataKey="month" fontSize={12} stroke="#9CA3AF" tickMargin={10} />
                  <YAxis fontSize={12} stroke="#9CA3AF" tickFormatter={(v) => formatCurrency(v)} />
                  <Tooltip formatter={formatTooltipValue} />
                  <Bar dataKey="income" name="Income" radius={[2, 2, 0, 0]}>
                    {monthlyData.map((d, i) => (
                      <Cell key={i} fill="#16A34A" fillOpacity={d.month === selectedMonth ? 1 : 0.3} />
                    ))}
                  </Bar>
                  <Bar dataKey="expense" name="Expense" radius={[2, 2, 0, 0]}>
                    {monthlyData.map((d, i) => (
                      <Cell key={i} fill="#DC2626" fillOpacity={d.month === selectedMonth ? 1 : 0.3} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="app-card transition-transform duration-200 hover:-translate-y-0.5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="card-title mb-1">Spending by category</p>
              <p className="text-sm text-gray-500">Breakdown for {selectedMonth}.</p>
            </div>
            <div className="rounded-full bg-[#2F5D4E]/10 px-3 py-1.5 text-xs font-semibold text-[#2F5D4E]">Live breakdown</div>
          </div>
          {categoryData.length === 0 ? (
            <p className="text-sm text-gray-400">No expenses in {selectedMonth}</p>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-56 w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="category" innerRadius={55} outerRadius={85}>
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

              <div className="w-full space-y-2.5 sm:w-1/2">
                {categoryData.map((d) => {
                  const pct = totalSpending > 0 ? Math.round((d.value / totalSpending) * 100) : 0
                  return (
                    <div key={d.category} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-700">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[d.category]?.chart ?? '#9CA3AF' }} />
                        {d.category}
                      </span>
                      <span className="font-semibold text-gray-900 tabular-nums">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        
      </div>
    </div>
  )
}