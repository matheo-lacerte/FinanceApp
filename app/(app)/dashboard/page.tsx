'use client'
import { mockTransactions } from "@/data/mock-transaction";
import type { Transaction } from "@/types/transaction";
import { useState, useSyncExternalStore } from "react";
import DashboardExpenseChart from "@/components/dashboard-expense-chart";


const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "medium",
}
);
const periodDayMonthFormatter = new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "short",
});
function parseLocalDate(dateString: string) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}
function getStartOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function getEndOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function shiftMonth(date: Date, offset: number) {
    return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}
let cachedTransactions: Transaction[] = mockTransactions;
let cachedRawTransactions: string | null = null;

function subscribeToTransactions() {
    return () => { };
}

function getTransactionsSnapshot() {
    if (typeof window === "undefined") {
        return mockTransactions;
    }

    const rawTransactions = localStorage.getItem("transactions");

    if (rawTransactions === cachedRawTransactions) {
        return cachedTransactions;
    }

    cachedRawTransactions = rawTransactions;
    cachedTransactions = rawTransactions
        ? JSON.parse(rawTransactions)
        : mockTransactions;

    return cachedTransactions;
}
export default function DashboardPage() {
    const transactions = useSyncExternalStore<Transaction[]>(
        subscribeToTransactions,
        getTransactionsSnapshot,
        () => mockTransactions
    );
    const [currentMonth, setCurrentMonth] = useState(() => getStartOfMonth(new Date()));
    const startOfMonth = getStartOfMonth(currentMonth);
    const endOfMonth = getEndOfMonth(currentMonth);
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = parseLocalDate(transaction.date);
        return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
    });

    const totalIncome = filteredTransactions.filter((transaction) => transaction.amount > 0).reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
    const totalExpenses = filteredTransactions.filter((transaction) => transaction.amount < 0).reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
    const netBalance = totalIncome - totalExpenses;
    const currencyFormatter = new Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency: "CAD",
    });
    const recentTransactions = [...filteredTransactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
    const expensesByCategory = filteredTransactions.filter((transaction) => transaction.amount < 0).reduce((accumulator, transaction) => {
        const currentAmount = accumulator[transaction.category] ?? 0;
        accumulator[transaction.category] = currentAmount + Math.abs(transaction.amount);
        return accumulator;
    }, {} as Record<string, number>);
    const expenseCategoryList = Object.entries(expensesByCategory).sort(
        (a, b) => b[1] - a[1]
    );
    const maxCategoryExpense = expenseCategoryList[0]?.[1] ?? 0;
    const periodLabel = `${periodDayMonthFormatter.format(startOfMonth)} - ${periodDayMonthFormatter.format(endOfMonth)} ${currentMonth.getFullYear()}`;

    return (
        <main className="space-y-6">
            <header className="flex flex-col gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
                        Dashboard
                    </h1>
                    <p className="text-sm text-slate-400">
                        Vue d'ensemble
                    </p>
                </div>
            </header>
            
            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">Revenus</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-emerald-300">+{currencyFormatter.format(totalIncome)}</h2>
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">Dépenses</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-rose-300">-{currencyFormatter.format(totalExpenses)}</h2>
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">Solde net</p>
                    <h2 className={`mt-3 text-3xl font-semibold tracking-tight ${netBalance >= 0 ? "text-slate-100" : "text-rose-300"}`}>
                        {currencyFormatter.format(netBalance)}
                    </h2>
                </div>
            </section>
            <section className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <button
                        type="button"
                        onClick={() => setCurrentMonth((previous) => shiftMonth(previous, -1))}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-lg text-slate-300 transition hover:border-[color:var(--border)] hover:bg-[color:var(--surface-soft)] hover:text-slate-100"
                        aria-label="Periode precedente"
                    >
                        &lt;
                    </button>
                    <div className="min-w-[220px] px-4 text-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                            Periode
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-100">
                            {periodLabel}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setCurrentMonth((previous) => shiftMonth(previous, 1))}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-lg text-slate-300 transition hover:border-[color:var(--border)] hover:bg-[color:var(--surface-soft)] hover:text-slate-100"
                        aria-label="Periode suivante"
                    >
                        &gt;
                    </button>
                </div>
            </section>
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">

                <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-slate-100">
                            Transactions récentes
                        </h2>
                        <p className="text-sm text-slate-400">
                            Les dernières opérations enregistrées
                        </p>
                    </div>

                    <div className="space-y-3">
                        {recentTransactions.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-5 text-sm text-slate-400">
                                Aucune transaction pour cette periode.
                            </div>
                        ) : recentTransactions.map((transaction) => {
                            const sign = transaction.amount < 0 ? "" : "+";

                            return (
                                <div key={transaction.id} className="flex items-start justify-between gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-3">
                                    <div className="min-w-0">
                                        <p className="font-medium text-slate-100">{transaction.merchant}</p>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
                                                {transaction.category}
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                {dateFormatter.format(parseLocalDate(transaction.date))}
                                            </span>
                                        </div>
                                        {transaction.notes && (
                                            <p className="mt-2 truncate text-sm text-slate-500">
                                                {transaction.notes}
                                            </p>
                                        )}
                                    </div>

                                    <p className={`shrink-0 text-lg font-semibold ${transaction.amount < 0 ? "text-rose-300" : "text-emerald-300"}`}>
                                        {sign}
                                        {currencyFormatter.format(transaction.amount)}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-slate-100">Dépenses par catégorie</h2>
                        <p className="text-sm text-slate-400">Répartition actuelle des sorties d&apos;argent</p>
                    </div>

                    {expenseCategoryList.length > 0 && (
                        <div className="mb-6">
                            <DashboardExpenseChart expenseCategoryList={expenseCategoryList} />
                        </div>
                    )}

                    <div className="space-y-3">
                        {expenseCategoryList.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-5 text-sm text-slate-400">
                                Aucune depense enregistree pour cette periode.
                            </div>
                        ) : expenseCategoryList.map(([category, amount]) => (
                            <div
                                key={category}
                                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-3"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-medium text-slate-100">{category}</p>
                                    <p className="shrink-0 font-semibold text-rose-300">
                                        -{currencyFormatter.format(amount)}
                                    </p>
                                </div>
                                <div className="mt-3 h-2 rounded-full bg-slate-800">
                                    <div
                                        className="h-2 rounded-full bg-rose-400"
                                        style={{ width: `${maxCategoryExpense === 0 ? 0 : (amount / maxCategoryExpense) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

        </main >
    );
}
