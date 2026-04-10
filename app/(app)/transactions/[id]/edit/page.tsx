'use client';

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategories } from "@/lib/category";
import { getTransactions, saveTransactions } from "@/lib/transaction";
import type { Transaction } from "@/types/transaction";

const categories = getCategories().map((category) => category.name);

const fieldClasses =
  "mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15";

export default function EditTransactionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const transactionId = Number(params.id);
  const transaction = getTransactions().find((item) => item.id === transactionId);

  const [merchant, setMerchant] = useState(transaction?.merchant ?? "");
  const [category, setCategory] = useState(transaction?.category ?? "");
  const [date, setDate] = useState(transaction?.date ?? "");
  const [amount, setAmount] = useState(
    transaction ? String(Math.abs(transaction.amount)) : "",
  );
  const [type, setType] = useState(
    transaction && transaction.amount >= 0 ? "revenu" : "depense",
  );
  const [notes, setNotes] = useState(transaction?.notes ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!merchant.trim() || !category || !date || !amount) {
      return;
    }

    const existingTransactions = getTransactions();
    const numericAmount = Number(amount);
    const finalAmount =
      type === "depense" ? -Math.abs(numericAmount) : Math.abs(numericAmount);

    const updatedTransaction: Transaction = {
      id: transactionId,
      merchant,
      category,
      date,
      amount: finalAmount,
      notes,
    };

    const updatedTransactions = existingTransactions.map((transaction) =>
      transaction.id === transactionId ? updatedTransaction : transaction,
    );

    saveTransactions(updatedTransactions);
    router.push("/transactions");
  }

  if (!transaction || !Number.isFinite(transactionId)) {
    return (
      <main className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
            Transaction introuvable
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            La transaction demandee n&apos;existe plus ou a deja ete supprimee.
          </p>
          <Link
            href="/transactions"
            className="mt-5 inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500/80 hover:text-slate-100"
          >
            Retour aux transactions
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
            Transaction
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
            Modifier la transaction
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Mets a jour les details sans perdre l&apos;historique existant.
          </p>
        </div>

        <Link
          href="/transactions"
          className="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500/80 hover:text-slate-100"
        >
          Retour aux transactions
        </Link>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <form
          className="space-y-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-200">
                Marchand
              </label>
              <input
                type="text"
                placeholder="Ex. IGA, Hydro Quebec, Salaire"
                className={fieldClasses}
                value={merchant}
                onChange={(event) => setMerchant(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Categorie
              </label>
              <select
                className={fieldClasses}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="" disabled>
                  Choisir une categorie
                </option>
                {categories.map((categoryName) => (
                  <option key={categoryName} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Date
              </label>
              <input
                type="date"
                className={fieldClasses}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Montant
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                className={fieldClasses}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Type
              </label>
              <select
                className={fieldClasses}
                value={type}
                onChange={(event) => setType(event.target.value)}
                required
              >
                <option value="depense">Depense</option>
                <option value="revenu">Revenu</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200">
              Notes
            </label>
            <textarea
              rows={4}
              placeholder="Ajoute un contexte utile pour retrouver cette transaction plus tard."
              className={`${fieldClasses} resize-none`}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-[color:var(--border)] pt-5 sm:flex-row sm:justify-end">
            <Link
              href="/transactions"
              className="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500/80 hover:text-slate-100"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/40 hover:bg-emerald-400/20 hover:text-white"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>

        <aside className="rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(16,185,129,0.10),rgba(15,23,42,0.08))] p-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
            Conseils
          </p>
          <h2 className="mt-3 text-lg font-semibold text-slate-100">
            Ajuste sans te perdre
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <li>Garde le meme marchand si tu corriges seulement le montant ou la date.</li>
            <li>Utilise le type pour conserver un montant propre dans tes rapports.</li>
            <li>Les notes sont pratiques pour documenter une correction ou un remboursement.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
