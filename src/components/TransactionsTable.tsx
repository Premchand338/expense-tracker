import { useState } from "react";
import type { Transaction } from "../type/transaction";
import { formatDate } from "../utils/dateHelpers";
import { formatCurrency, CATEGORY_COLORS } from "../utils/format";
import { useToast } from "../context/ToastContext";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionsTable({ transactions, onDelete, onEdit }: Props) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">(
    "all",
  );
  const { showToast } = useToast();

  const filtered = transactions
    .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => typeFilter === "all" || t.type === typeFilter)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="app-card">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            placeholder="     Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-12"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", "income", "expense"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`app-btn ${typeFilter === t ? "btn-secondary" : "btn-ghost"} capitalize`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-4xl border border-gray-200">
        <table className="min-w-180 w-full text-sm divide-y divide-gray-200 bg-white">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {formatDate(t.date)}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {t.description}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      CATEGORY_COLORS[t.category]?.bg ?? "bg-slate-100"
                    } ${CATEGORY_COLORS[t.category]?.text ?? "text-slate-700"}`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-current opacity-40" />
                    {t.category}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 text-right text-sm font-semibold tabular-nums ${t.amount < 0 ? "text-red-600" : "text-emerald-600"}`}
                >
                  {t.amount < 0 ? "-" : "+"}₹
                  {formatCurrency(Math.abs(t.amount))}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(t)}
                      className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
                    >
                      <i className="fi fi-rr-edit"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(t.id);
                        showToast("Transaction removed", "error");
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-3xl border border-gray-200 bg-slate-50 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {formatDate(t.date)}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 truncate">
                  {t.description}
                </p>
                <span
                  className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    CATEGORY_COLORS[t.category]?.bg ?? "bg-slate-100"
                  } ${CATEGORY_COLORS[t.category]?.text ?? "text-slate-700"}`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-current opacity-40" />
                  {t.category}
                </span>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <p
                  className={`text-sm font-semibold tabular-nums ${t.amount < 0 ? "text-red-600" : "text-emerald-600"}`}
                >
                  {t.amount < 0 ? "-" : "+"}₹
                  {formatCurrency(Math.abs(t.amount))}
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onEdit(t)}
                    aria-label="Edit"
                    className="w-8 h-8 rounded-full border border-amber-100 bg-amber-50 text-amber-700 flex items-center justify-center text-xs"
                  >
                    <i className="fi fi-rr-edit"></i>
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    aria-label="Delete"
                    className="w-8 h-8 rounded-full border border-red-100 bg-red-50 text-red-700 flex items-center justify-center text-xs"
                  >
                    <i className="fi fi-rr-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-8 text-sm">
          No transactions found
        </p>
      )}
    </div>
  );
}
