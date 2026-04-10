'use client';
import { Fragment, useState } from "react";
import { getTransactions } from "@/lib/transaction";
import { Transaction } from "@/types/transaction";
import Link from "next/link";

const categories = ["Nourriture", "Revenu", "Services publics", "Transport", "Divertissement", "Santé", "Autres"];
const sortOptions = [
  { value: "desc", label: "plus recentes" },
  { value: "asc", label: "plus anciennes" },
];
const currencyFormatter = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
});
const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
  dateStyle: "medium",
}
);
function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(getTransactions());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [searchTermMarchand, setSearchTermMarchand] = useState("")
  const selectClasses = "border border-[color:var(--border)] rounded-md bg-[color:var(--surface)] px-2 py-1 text-sm text-slate-300";
  const searchMarchand = "border border-[color:var(--border)] rounded-md bg-[color:var(--surface)] px-2 py-1 text-sm text-slate-300 text-center";
  const [openedTransactionId, setOpenedTransactionId] = useState<number | null>(null);
  const [dateSortOrder, setDateSortOrder] = useState<"asc" | "desc">("desc");
  const filteredTransactions = transactions.filter(t => {
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesMonth = selectedMonth === "all" || t.date.split("-")[1] === selectedMonth;
    const matchesMarchand = searchTermMarchand === "" || t.merchant.toLowerCase().startsWith(searchTermMarchand.toLowerCase());
    return matchesCategory && matchesMonth && matchesMarchand;
  });
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (dateSortOrder == "desc") {
      return parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime();
    }

    return parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime();
  })

  return (
    <main className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Transactions</h1>
        <p className="text-sm text-slate-400">{filteredTransactions.length} opération{filteredTransactions.length > 1 && ("s")}</p>
      </header>

      <div className="flex flex-col gap-2 md:flex-row">
        <select className={selectClasses} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="all">Toutes les categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className={`${selectClasses} w-full md:w-auto`} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
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
        <select className={`${selectClasses} w-full md:w-auto md:hidden`} value={dateSortOrder} onChange={e => setDateSortOrder(e.target.value as "asc" | "desc")}>
          {sortOptions.map((sortOption) => (
            <option key={sortOption.value} value={sortOption.value}>{`Trier par date : ${sortOption.label}`}</option>
          ))}
        </select>
        <input
          className={`${searchMarchand} w-full md:w-auto`}
          value={searchTermMarchand}
          onChange={e => setSearchTermMarchand(e.target.value)}
          placeholder="Rechercher un marchand"
        />
      </div>
      {filteredTransactions.length === 0 ? (
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-sm text-slate-400">
          Aucune transaction ne correspond aux filtres.
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-xl space-y-3 md:hidden">
            {sortedTransactions.map((transaction) => {
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
                      {currencyFormatter.format(transaction.amount)}
                    </div>
                  </div>

                  <div className="text-sm text-slate-400">
                    {transaction.category} • {dateFormatter.format(parseLocalDate(transaction.date))}
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
                    <th className="p-4 text-left font-medium hover:text-slate-100">
                      <button type="button" onClick={() => setDateSortOrder(dateSortOrder === "desc" ? "asc" : "desc")

                      }
                      >
                        {dateSortOrder === "desc" ? (
                          "Date ↓"
                        ) : (
                          "Date ↑"
                        )}
                      </button>

                    </th>
                    <th className="p-4 text-left font-medium">Marchand</th>
                    <th className="p-4 text-left font-medium">Categorie</th>
                    <th className="p-4 text-right font-medium">Montant</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedTransactions.map((t) => {
                    const sign = t.amount < 0 ? "" : "+";
                    const isOpen = openedTransactionId === t.id;
                    return (
                      <Fragment key={t.id}>
                        <tr onClick={() => setOpenedTransactionId(isOpen ? null : t.id)} className="border-t border-[color:var(--border)] text-sm hover:bg-[color:var(--surface-soft)]">
                          <td className="p-4 text-slate-400">{dateFormatter.format(parseLocalDate(t.date))}</td>
                          <td className="p-4 font-medium text-slate-100">{t.merchant}</td>
                          <td className="p-4 text-slate-400">{t.category}</td>
                          <td
                            className={`p-4 text-right font-semibold ${t.amount < 0 ? "text-rose-300" : "text-emerald-300"
                              }`}
                          >
                            {sign}
                            {currencyFormatter.format(t.amount)}
                          </td>
                        </tr>
                        {isOpen && (
                          <tr className="border-t border-[color:var(--border)] bg-[color:var(--surface-soft)] text-sm">
                            <td colSpan={4} className="px-4 py-2 text-slate-400">
                              <div className="flex w-full items-center">
                                <p>Actions rapides</p>
                                <div className="ml-auto flex gap-2">
                                  <button className=" rounded bg-blue-500 px-3 py-1 text-white">Modifier</button>
                                  <button className=" rounded bg-red-500 px-3 py-1 text-white">Supprimer</button>
                                </div>
                              </div>

                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </>

      )}

    </main>
  );
}
