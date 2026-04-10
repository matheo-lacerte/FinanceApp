import type { Category } from "@/types/categories";
import { mockCategories } from "@/data/mock-category";

const STORAGE_KEY = "categories";

export function getCategories(): Category[] {
    if (typeof window === "undefined") {
        return mockCategories;
    }
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    if (!storedCategories) {
        return mockCategories;
    }
    return JSON.parse(storedCategories);
}

export function saveCategories(categories: Category[]) {
    if (typeof window === "undefined") {
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
}