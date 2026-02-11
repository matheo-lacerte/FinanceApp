'use client';
import { mock } from "node:test";
import { useState } from "react";

const mockData = [
  {
    id: 1,
    merchant: "IGA",
    category: "Nourriture",
    amount: -50.25,
    date: "2024-06-01",
  },
  { id: 2, merchant: "Paie", category: "Revenu", amount: 1500.0, date: "2024-06-03" },
  {
    id: 3,
    merchant: "Facture Électricite",
    category: "Services publics",
    amount: -75.0,
    date: "2024-06-05",
  },
];

const categories = [ "Nourriture", "Revenu", "Services publics", "Transport", "Divertissement", "Santé", "Autres" ];

export default function TransactionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const selectClasses = "border border-[color:var(--border)] rounded-md bg-[color:var(--surface)] px-2 py-1 text-sm text-slate-300";
  
  const filteredTransaction = mockData.filter(t => {
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesMonth = selectedMonth === "all" || t.date.split("-")[1] === selectedMonth;
    return matchesCategory && matchesMonth;
  });

  return (
    <main className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Transactions</h1>
        <p className="text-sm text-slate-400">{filteredTransaction.length} operations recentes</p>
      </header>

      <div>
        <select className={selectClasses} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="all">Toutes les categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className={`ml-2 ${selectClasses}`} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          <option value="all">Tous les mois</option>
          <option value="01">Janvier</option>
          <option value="02">Février</option>
          <option value="03">Mars</option>
          <option value="04">Avril</option>
          <option value="05">Mai</option>
          <option value="06">Juin</option>
          <option value="07">Juillet</option>
          <option value="08">Août</option>
          <option value="09">Septembre</option>
          <option value="10">Octobre</option>
          <option value="11">Novembre</option>
          <option value="12">Décembre</option>
        </select>
      </div>
      <div className="mx-auto max-w-xl space-y-3 md:hidden">
        {filteredTransaction.map((transaction) => {
          const sign = transaction.amount < 0 ? "" : "+";
          
          return (
            <a
              key={transaction.id}
              href={`/transactions/${transaction.id}`}
              className="block rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 transition hover:border-slate-500/80"
            >
              <div className="flex justify-between font-semibold">
                <div className="text-slate-100">{transaction.merchant}</div>
                <div className={transaction.amount < 0 ? "text-rose-300" : "text-emerald-300"}>
                  {sign}
                  {transaction.amount.toFixed(2)} $
                </div>
              </div>

              <div className="text-sm text-slate-400">
                {transaction.category} • {transaction.date}
              </div>
            </a>
          );
        })}
      </div>
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]">
          <table className="w-full">
            <thead className="bg-[color:var(--surface-soft)]">
              <tr className="text-sm text-slate-300">
                <th className="p-4 text-left font-medium">Date</th>
                <th className="p-4 text-left font-medium">Marchand</th>
                <th className="p-4 text-left font-medium">Categorie</th>
                <th className="p-4 text-right font-medium">Montant</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransaction.map((t) => {
                const sign = t.amount < 0 ? "" : "+";
                return (
                  <tr key={t.id} className="border-t border-[color:var(--border)] text-sm hover:bg-[color:var(--surface-soft)]">
                    <td className="p-4 text-slate-400">{t.date}</td>
                    <td className="p-4 font-medium text-slate-100">{t.merchant}</td>
                    <td className="p-4 text-slate-400">{t.category}</td>
                    <td
                      className={`p-4 text-right font-semibold ${
                        t.amount < 0 ? "text-rose-300" : "text-emerald-300"
                      }`}
                    >
                      {sign}
                      {t.amount.toFixed(2)} $
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

