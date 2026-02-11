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
  const selectClasses = "border border-[color:var(--border)] rounded-md bg-[color:var(--surface)] px-2 py-1 text-sm text-slate-300";
  
  return (
    <main className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Transactions</h1>
        <p className="text-sm text-slate-400">{mockData.length} operations recentes</p>
      </header>

      <div>
        <select className={selectClasses}>
          <option value="all">Toutes les categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className={`ml-2 ${selectClasses}`}>
          <option value="all">Tous les mois</option>
          <option value="january">Janvier</option>
          <option value="february">Février</option>
          <option value="march">Mars</option>
          <option value="april">Avril</option>
          <option value="may">Mai</option>
          <option value="june">Juin</option>
          <option value="july">Juillet</option>
          <option value="august">Août</option>
          <option value="september">Septembre</option>
          <option value="october">Octobre</option>
          <option value="november">Novembre</option>
          <option value="december">Décembre</option>
        </select>
      </div>
      <div className="mx-auto max-w-xl space-y-3 md:hidden">
        {mockData.map((transaction) => {
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
              {mockData.map((t) => {
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
