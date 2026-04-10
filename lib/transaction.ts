import type { Transaction } from "@/types/transaction";
import { mockTransactions } from "@/data/mock-transaction";

const STORAGE_KEY = "transactions";

export function getTransactions(): Transaction[] {
    if (typeof window === "undefined") {
        return mockTransactions;
    }
    const storedTransactions = localStorage.getItem(STORAGE_KEY);
    if (!storedTransactions) {
        return mockTransactions;
    }
    return JSON.parse(storedTransactions);
}

export function saveTransactions(transactions: Transaction[]) {
    if (typeof window === "undefined") {
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}