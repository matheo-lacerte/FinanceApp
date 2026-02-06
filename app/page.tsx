export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6 md:p-12">
      <section className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-200">FinanceApp</p>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-100">
          Bienvenue sur ton espace financier
        </h1>
        <p className="mb-6 text-slate-400">
          Interface en production avec un style sobre et lisible.
        </p>
        <a
          href="/transactions"
          className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Voir les transactions
        </a>
      </section>
    </main>
  );
}
