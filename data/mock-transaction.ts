import type { Transaction } from "@/types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    merchant: "IGA",
    category: "Nourriture",
    amount: -50.25,
    date: "2024-06-01",
    notes: "Achat de produits alimentaires",
  },
  { id: 2, merchant: "Paie", category: "Revenu", amount: 1500.0, date: "2024-06-03", notes: "Salaire du mois" },
  {
    id: 3,
    merchant: "Facture Électricite",
    category: "Services publics",
    amount: -75.0,
    date: "2024-06-05",
    notes: "Facture d'électricité du mois",
  },
];
