'use client';
import Link from "next/link";
import { getCategories } from "@/lib/category";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Transaction } from "@/types/transaction";
import { saveTransactions } from "@/lib/transaction";
import { getTransactions } from "@/lib/transaction";

const categories = getCategories().map(c => c.name);

const fieldClasses =
    "mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15";

export default function NewTransactionPage() {
    const [merchant, setMerchant] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("depense");
    const [notes, setNotes] = useState("");
    const router = useRouter();

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const existingTransactions = getTransactions();
        const numericAmount = Number(amount);

        const finalAmount = type === "depense" ? -Math.abs(numericAmount) : Math.abs(numericAmount);

        if (!merchant.trim() || !category || !date || !amount) {
            return;
        }


        const newTransaction: Transaction = {
            id: Date.now(),
            merchant: merchant,
            category: category,
            date: date,
            amount: finalAmount,
            notes: notes,
        }

        saveTransactions([...existingTransactions, newTransaction]);
        router.push("/transactions");
    }
    return (
        <main className="mx-auto max-w-5xl space-y-6">
            <header className="flex flex-col gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
                        Transaction
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
                        Nouvelle transaction
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-400">
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
                <form className="space-y-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]" onSubmit={handleSubmit}>
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
                                onChange={e => setMerchant(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-200">
                                Categorie
                            </label>
                            <select defaultValue="" className={fieldClasses} value={category} onChange={e => setCategory(e.target.value)} required>
                                <option value="" disabled>
                                    Choisir une categorie
                                </option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
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
                                onChange={e => setDate(e.target.value)}
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
                                onChange={e => setAmount(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-200">
                                Type
                            </label>
                            <select
                                defaultValue="depense"
                                className={fieldClasses}
                                value={type}
                                onChange={e => setType(e.target.value)}
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
                            onChange={e => setNotes(e.target.value)}
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
                            Enregistrer la transaction
                        </button>
                    </div>
                </form>

                <aside className="rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(16,185,129,0.10),rgba(15,23,42,0.08))] p-6">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
                        Conseils
                    </p>
                    <h2 className="mt-3 text-lg font-semibold text-slate-100">
                        Garde la saisie rapide
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                        <li>Utilise le nom du marchand tel qu&apos;il apparait sur le releve.</li>
                        <li>Choisis une categorie stable pour garder de bons rapports plus tard.</li>
                        <li>Entre un montant positif pour un revenu et negatif pour une depense.</li>
                    </ul>
                </aside>
            </section>
        </main>
    );
}
